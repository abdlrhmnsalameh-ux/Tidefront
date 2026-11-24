import { OBSTACLES, WORLD, heightAt, clamp, angleDelta, heading } from './map.js';
import { VEHICLES } from './rules.js';

const SIZE = 24;
const NX = 39;
const NZ = 30;
const nodes = Array.from({ length: NX * NZ }, (_, id) => {
  const x = (id % NX - (NX - 1) / 2) * SIZE;
  const z = (Math.floor(id / NX) - (NZ - 1) / 2) * SIZE;
  const y = heightAt(x, z);
  const clear = y > .32 && !OBSTACLES.some(b => Math.abs(x - b.x) < b.w / 2 + 5
    && Math.abs(z - b.z) < b.d / 2 + 5);
  return { id, x, z, y, clear, edges: [] };
});

for (const node of nodes) {
  if (!node.clear) continue;
  const row = Math.floor(node.id / NX);
  const col = node.id % NX;
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      if ((!r && !c) || col + c < 0 || col + c >= NX || row + r < 0 || row + r >= NZ) continue;
      const target = nodes[(row + r) * NX + col + c];
      if (!target.clear || Math.abs(target.y - node.y) > 5.4) continue;
      if (r && c && (!nodes[node.id + r * NX].clear || !nodes[node.id + c].clear)) continue;
      node.edges.push(target);
    }
  }
}

function closest(x, z) {
  let best;
  let range = Infinity;
  for (const node of nodes) {
    if (!node.clear) continue;
    const distance = (node.x - x) ** 2 + (node.z - z) ** 2;
    if (distance >= range) continue;
    best = node;
    range = distance;
  }
  return best;
}

export function pathBetween(x, z, goalX, goalZ) {
  const start = closest(x, z);
  const end = closest(goalX, goalZ);
  const g = new Float64Array(nodes.length).fill(Infinity);
  const previous = new Int32Array(nodes.length).fill(-1);
  const open = new Set([start]);
  const heuristic = node => Math.hypot(node.x - end.x, node.z - end.z);
  g[start.id] = 0;
  while (open.size) {
    let here;
    let score = Infinity;
    for (const node of open) {
      const rank = g[node.id] + heuristic(node);
      if (rank < score) { here = node; score = rank; }
    }
    if (here === end) {
      const path = [{ x: goalX, z: goalZ }];
      for (let id = end.id; id >= 0; id = previous[id]) path.push(nodes[id]);
      return path.reverse();
    }
    open.delete(here);
    for (const next of here.edges) {
      const cost = Math.hypot(here.x - next.x, here.z - next.z) + Math.abs(here.y - next.y) * 1.8;
      if (g[here.id] + cost >= g[next.id]) continue;
      g[next.id] = g[here.id] + cost;
      previous[next.id] = here.id;
      open.add(next);
    }
  }
  return [];
}

function clearSegment(from, to) {
  const length = Math.hypot(to.x - from.x, to.z - from.z);
  const steps = Math.max(1, Math.ceil(length / 4));
  let ground = heightAt(from.x, from.z);
  for (let i = 1; i <= steps; i++) {
    const x = from.x + (to.x - from.x) * i / steps;
    const z = from.z + (to.z - from.z) * i / steps;
    const next = heightAt(x, z);
    if (next < .29 || Math.abs(next - ground) > 2.5 || OBSTACLES.some(b => Math.abs(x - b.x) < b.w / 2 + 3.4
      && Math.abs(z - b.z) < b.d / 2 + 3.4)) return false;
    ground = next;
  }
  return true;
}

export function commandPath(x, z, goalX, goalZ) {
  let here = { x, z };
  const goal = { x: goalX, z: goalZ };
  if (clearSegment(here, goal)) return [goal];
  const gridPath = pathBetween(x, z, goalX, goalZ);
  const route = [];
  while (gridPath.length) {
    let next = gridPath.length - 1;
    while (next > 0 && !clearSegment(here, gridPath[next])) next--;
    here = gridPath[next];
    route.push(here);
    gridPath.splice(0, next + 1);
  }
  return route;
}

export function botControl(sim, bot) {
  const guide = sim.command.guide(bot);
  const body = bot.vehicle?.body ?? bot.body;
  const { x, y, z } = body.position;
  const version = guide?.version ?? 0;
  if (bot.orderVersion !== version) {
    bot.nextPlan = 0;
    bot.orderVersion = version;
    bot.path = [];
  }
  if (guide?.stop) {
    bot.path = [];
    bot.nextPlan = 0;
  } else if (guide && sim.time >= bot.nextPlan) {
    bot.path = commandPath(x, z, guide.x, guide.z);
    bot.nextPlan = sim.time + 4.4 + sim.random() * 1.3;
  } else if (!guide && sim.time >= bot.nextPlan) {
    const target = sim.points.filter(p => p.owner !== bot.team).sort((a, b) => rank(a) - rank(b))[0];
    bot.path = target ? pathBetween(x, z, target.x, target.z) : [];
    bot.nextPlan = sim.time + 3.7 + sim.random() * 1.7;
    if (!bot.vehicle && bot.index % 4 === 0) {
      const vehicle = sim.closestVehicle(bot, true);
      if (vehicle && vehicle.type !== 'jet' && vehicle.type !== 'transport') sim.enter(bot, vehicle);
    }
    function rank(p) {
      const lane = bot.index % 2 === 0 ? -1 : 1;
      return Math.hypot(p.x - x, p.z - z) + (p.z * lane < 0 ? 88 : 0)
        + (p.home === bot.team ? -60 : 0);
    }
  }
  while (bot.path.length > 1 && Math.hypot(bot.path[0].x - x, bot.path[0].z - z) < 9.5) bot.path.shift();
  const next = bot.path[0];
  let enemy;
  let distance = bot.vehicle ? 130 : 82;
  for (const rival of sim.players) {
    if (rival.team === bot.team || rival.dead) continue;
    const target = (rival.vehicle?.body ?? rival.body).position;
    const range = Math.hypot(target.x - x, target.y - y, target.z - z);
    if (range > distance || Math.abs(target.y - y) > 24) continue;
    enemy = target;
    distance = range;
  }

  const walkYaw = next ? heading(next.x - x, next.z - z) : bot.yaw;
  const aimYaw = enemy ? heading(enemy.x - x, enemy.z - z) + Math.sin(sim.time * 7 + bot.index) * .024 : walkYaw;
  const pitch = enemy ? Math.atan2(enemy.y + .22 - y, distance) : 0;
  const inside = Math.abs(x) < WORLD.x - 10 && Math.abs(z) < WORLD.z - 9;
  const last = bot.path.length === 1;
  const range = last ? (guide?.boarding ? 3.4 : guide && bot.vehicle ? 7.2 : 5.7) : 5.7;
  const remaining = next ? Math.hypot(next.x - x, next.z - z) : 0;
  const walk = next && remaining > range;
  const input = bot.input;
  input.yaw = aimYaw;
  input.pitch = pitch;
  input.fire = Boolean(enemy && Math.sin(sim.time * 4.7 + bot.index) > -.22);
  if (bot.vehicle?.type === 'ballistic') bot.vehicle.target = enemy && { x: enemy.x, z: enemy.z };
  input.alt = false;
  input.reloading = false;
  input.slot = enemy && distance < 48 && !bot.vehicle && bot.index % 3 === 0 && bot.ammo.rocket > 0 ? 2 : 1;
  input.boost = !enemy && inside;
  if (bot.vehicle) {
    const turn = angleDelta(walkYaw, bot.vehicle.yaw);
    input.a = turn < 0 ? clamp(-turn * 2.3, 0, 1) : 0;
    input.d = turn > 0 ? clamp(turn * 2.3, 0, 1) : 0;
    const approach = guide && last ? clamp(remaining * .062, .28, 1) : 1;
    const pivot = guide && bot.vehicle.type === 'tank' && Math.abs(turn) > 1.1;
    input.w = walk && !pivot ? Math.max(.12, 1 - Math.abs(turn) * .43) * approach : 0;
    input.s = 0;
    if (enemy && VEHICLES[bot.vehicle.type].secondary && distance < 35) input.alt = !input.fire;
  } else {
    const relative = angleDelta(walkYaw, aimYaw);
    const advance = walk ? (enemy && distance < 17 ? .3 : 1) : 0;
    input.w = Math.max(0, Math.cos(relative)) * advance;
    input.s = Math.max(0, -Math.cos(relative)) * advance;
    input.d = Math.max(0, Math.sin(relative)) * advance;
    input.a = Math.max(0, -Math.sin(relative)) * advance;
  }
}
