import { Vec3 } from 'cannon-es';
import { ARMS } from './rules.js';
import { angleDelta, clamp, forward, heightAt, mix } from './map.js';
import { ballisticAim } from './ballistics.js';

export function fireWeapons(sim, player) {
  const input = player.input;
  const vehicle = player.vehicle;
  if (vehicle) {
    if (input.fire) {
      if (vehicle.type === 'ballistic') fireArc(sim, player, vehicle);
      else fire(sim, player, vehicle.spec.primary, vehicle);
    }
    if (input.alt && vehicle.spec.secondary) fire(sim, player, vehicle.spec.secondary, vehicle);
    return;
  }
  if (input.slot) player.slot = input.slot;
  const ammo = player.slot === 2 ? 'rocket' : 'rifle';
  if (player.reloadUntil && sim.time >= player.reloadUntil) {
    player.ammo[player.reloading] = ARMS[player.reloading].capacity;
    player.reloadUntil = 0;
  }
  if (player.reloadUntil) return;
  if ((input.action & 4 || (input.fire && player.ammo[ammo] === 0)) && player.ammo[ammo] < ARMS[ammo].capacity) {
    player.reloading = ammo;
    player.reloadUntil = sim.time + ARMS[ammo].reload;
  } else if (input.fire && player.ammo[ammo] > 0 && fire(sim, player, ammo, player)) {
    player.ammo[ammo]--;
  }
}

function fireArc(sim, player, vehicle) {
  if ((vehicle.cooldowns.ballistic ?? 0) > sim.time) return;
  const at = vehicle.body.position;
  const aim = ballisticAim(vehicle, vehicle.target);
  const onLand = heightAt(at.x, at.z) >= 0 || Boolean(vehicle.supportShip);
  if (!aim || !onLand || !vehicle.grounded || Math.abs(vehicle.speed) > 1.4
    || Math.abs(vehicle.supportShip?.speed ?? 0) > 1.4
    || Math.abs(angleDelta(aim.yaw, vehicle.turret)) > .06
    || Math.abs(aim.pitch - vehicle.weaponPitch) > .06) return;
  launchProjectile(sim, 'ballistic', player, vehicle, new Vec3(aim.x, aim.y, aim.z), new Vec3(aim.vx, aim.vy, aim.vz));
  vehicle.recoil = 1;
  vehicle.cooldowns.ballistic = sim.time + ARMS.ballistic.interval;
  player.graceUntil = Math.min(player.graceUntil, sim.time);
}

function fire(sim, player, kind, source) {
  const spec = ARMS[kind];
  if ((source.cooldowns[kind] ?? 0) > sim.time) return false;
  const { x, y, z } = source.body.position;
  const running = Math.hypot(source.body.velocity.x, source.body.velocity.z);
  const dispersion = kind === 'rifle' ? .012 + Math.min(.030, running * .004) : .006;
  const yaw = (source.turret ?? source.yaw) + (sim.random() - .5) * dispersion;
  const pitch = source.weaponPitch ?? source.pitch;
  const [fx, fz] = forward(yaw);
  const offset = source.type === 'infantry' ? .76 : source.type === 'transport' ? 4.6
    : source.type === 'jet' ? 5.7 : 3.05;
  const muzzle = source.type === 'infantry' ? .68 : source.type === 'transport' ? 3.0
    : source.type === 'jet' ? .28 : source.type === 'recon' ? 1.12 : 1.56;
  const position = new Vec3(x + fx * offset, y + muzzle + Math.sin(pitch) * offset, z + fz * offset);
  const speed = spec.speed * (kind === 'rocket' ? .74 : 1);
  const velocity = new Vec3(fx * speed * Math.cos(pitch), speed * Math.sin(pitch), fz * speed * Math.cos(pitch));
  const inertia = source.type === 'jet' ? 1 : source.type === 'infantry' ? .18 : .46;
  velocity.addScaledVector(inertia, source.body.velocity, velocity);
  launchProjectile(sim, kind, player, source, position, velocity);
  if (source.type !== 'infantry') source.recoil = kind === 'cannon' ? 1 : kind === 'salvo' ? .6 : .17;
  source.cooldowns[kind] = sim.time + spec.interval;
  player.graceUntil = Math.min(player.graceUntil, sim.time);
  return true;
}

export function launchProjectile(sim, kind, player, source, position, velocity) {
  const spec = ARMS[kind];
  const boost = kind === 'rocket' ? 56 : kind === 'salvo' ? 34 : 0;
  sim.projectiles.push({ id: ++sim.serial, kind, spec, owner: player, source, position, velocity, age: 0, boost });
  sim.emit('fire', position, { kind, shooter: source ? player.id : null });
}

function terrainContact(from, to) {
  const samples = Math.max(1, Math.ceil(Math.hypot(to.x - from.x, to.z - from.z) / 2));
  function clearance(t) {
    const x = mix(from.x, to.x, t);
    const z = mix(from.z, to.z, t);
    return mix(from.y, to.y, t) - Math.max(0, heightAt(x, z));
  }
  function contact(t) {
    const x = mix(from.x, to.x, t);
    const z = mix(from.z, to.z, t);
    return { point: new Vec3(x, Math.max(0, heightAt(x, z)), z), t };
  }
  if (clearance(0) <= 0) return contact(0);
  for (let i = 1; i <= samples; i++) {
    let high = i / samples;
    if (clearance(high) > 0) continue;
    let low = (i - 1) / samples;
    for (let j = 0; j < 8; j++) {
      const middle = (low + high) * .5;
      if (clearance(middle) > 0) low = middle;
      else high = middle;
    }
    return contact(high);
  }
  return null;
}

export function advanceShots(sim, dt) {
  const active = [];
  for (const shot of sim.projectiles) {
    const { position, velocity, spec } = shot;
    shot.age += dt;
    if (shot.age > spec.life) continue;
    if (shot.boost && shot.age < .39) {
      const speed = velocity.length();
      velocity.scale(1 + dt * shot.boost / Math.max(speed, 1), velocity);
    }
    const next = position.addScaledVector(dt, velocity);
    next.y -= .5 * spec.fall * dt * dt;
    velocity.y -= spec.fall * dt;
    const terrain = terrainContact(position, next);
    let impact = terrain?.point ?? null;
    let distance = position.distanceTo(next) * (terrain?.t ?? 1);
    let target = null;
    sim.world.raycastAll(position, next, { skipBackfaces: true }, hit => {
      const entity = hit.body.entity;
      if (entity === shot.owner || entity === shot.source || entity?.dead || entity?.vehicle) return;
      if (hit.distance > distance) return;
      distance = hit.distance;
      impact = hit.hitPointWorld.clone();
      target = entity ?? null;
    });
    if (!impact) {
      position.copy(next);
      active.push(shot);
      continue;
    }
    if (target) {
      let armor = !spec.blast && target.type !== 'infantry' ? .25 : 1;
      if (target.type === 'tank') {
        const [fx, fz] = forward(target.yaw);
        const aspect = -(fx * velocity.x + fz * velocity.z) / Math.max(1, Math.hypot(velocity.x, velocity.z));
        armor *= mix(1.14, .60, clamp((aspect + 1) * .5, 0, 1));
      }
      sim.damage(target, spec.damage * armor, shot.owner);
    }
    if (spec.blast) blast(sim, impact, spec.blast, spec.damage * .67, shot.owner, target);
    else sim.emit('impact', impact, { wet: heightAt(impact.x, impact.z) < 0 });
  }
  sim.projectiles = active;
}

export function blast(sim, at, radius, energy, owner, direct = null) {
  sim.emit('blast', at, { radius });
  for (const entity of [...sim.vehicles, ...sim.players]) {
    if (entity.dead || entity.vehicle || entity === direct) continue;
    const d = entity.body.position.distanceTo(at);
    if (d < radius) sim.damage(entity, energy * (1 - d / radius) ** .68, owner);
  }
}
