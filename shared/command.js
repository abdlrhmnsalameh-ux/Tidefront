import { heightAt, OBSTACLES, TEAMS, WORLD } from './map.js';
import { designateBallistic } from './ballistics.js';

const ARMOR = ['tank', 'launcher', 'ballistic'];
const SQUADS = ['rifles-1', 'rifles-2'];
const squadFor = player => player.fireteam ?? SQUADS[player.index % 2];
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const pointAt = entity => entity.body.position;
const small = n => Math.round(n * 10) / 10;
const clearLand = (x, z) => Math.abs(x) <= WORLD.x - 4 && Math.abs(z) <= WORLD.z - 4
  && heightAt(x, z) > .30 && !OBSTACLES.some(b => Math.abs(x - b.x) < b.w * .5 + 3.2 && Math.abs(z - b.z) < b.d * .5 + 3.2);

function formation(point, count) {
  const spacing = 19;
  const positions = [];
  const border = Math.ceil(2 * Math.max(WORLD.x, WORLD.z) / spacing);
  for (let ring = 0; ring <= border && positions.length < count; ring++) {
    for (let dz = -ring; dz <= ring && positions.length < count; dz++) {
      for (let dx = -ring; dx <= ring && positions.length < count; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== ring) continue;
        const x = point.x + dx * spacing;
        const z = point.z + dz * spacing;
        if (clearLand(x, z)) positions.push({ x, z });
      }
    }
  }
  return positions;
}

export class CommandBook {
  constructor(game) {
    this.game = game;
    this.leaders = [null, null];
    this.orders = [new Map(), new Map()];
    this.groups = [new Map(), new Map()];
    this.groupNumber = [0, 0];
    this.boarding = new Map();
    this.serial = 0;
    this.deployTeam = null;
  }

  claim(player) {
    this.leaders[player.team] ??= player.id;
  }

  leave(player) {
    const team = player.team;
    if (this.leaders[team] !== player.id) return;
    this.leaders[team] = this.game.players.find(p => p.team === team && p.human)?.id ?? null;
    if (this.leaders[team] === null) {
      this.orders[team].clear();
      this.groups[team].clear();
    }
  }

  crewFor(team, except) {
    const reserved = new Set([...this.orders[team].values()].filter(order => order.unit !== except).map(order => order.crew));
    return this.game.players.filter(p => p.team === team && !p.human && !p.dead && !p.vehicle && !reserved.has(p.id));
  }

  closestCrew(vehicle) {
    const at = pointAt(vehicle);
    return this.crewFor(vehicle.team, vehicle.id).sort((a, b) => distance(pointAt(a), at) - distance(pointAt(b), at))[0];
  }

  squads(team) {
    const grouped = new Map(SQUADS.map(id => [id, []]));
    for (const p of this.game.players) {
      if (p.team === team && p.fireteam && !grouped.has(p.fireteam)) grouped.set(p.fireteam, []);
    }
    for (const p of this.crewFor(team)) grouped.get(squadFor(p)).push(p);
    return [...grouped].map(([id, members], index) => {
      const center = members.reduce((sum, member) => {
        sum.x += pointAt(member).x / members.length;
        sum.z += pointAt(member).z / members.length;
        return sum;
      }, { x: 0, z: 0 });
      return { id, label: index < 2 ? 'Rifle Squad ' + (index + 1) : 'Rifle Fireteam ' + (index - 1), badge: 'S' + (index + 1),
        type: 'infantry', members, at: center, available: members.length > 0 };
    });
  }

  units(team) {
    let tanks = 0;
    let launchers = 0;
    let ballistic = 0;
    const vehicles = this.game.vehicles.filter(v => v.team === team && !v.spawn.reserve && ARMOR.includes(v.type)).map(vehicle => {
      const tank = vehicle.type === 'tank';
      const meridian = vehicle.type === 'ballistic';
      const index = tank ? ++tanks : meridian ? ++ballistic : ++launchers;
      const name = vehicle.type === 'launcher' ? 'Lancer Missile Launcher' : vehicle.spec.name;
      return { id: vehicle.id, label: name + (tank || index > 1 ? ' ' + index : ''),
        badge: (tank ? 'T' : meridian ? 'M' : 'L') + index, type: vehicle.type, vehicle, at: pointAt(vehicle),
        available: !vehicle.dead && !vehicle.driver?.human && Boolean(vehicle.driver || this.closestCrew(vehicle)) };
    });
    return [...this.squads(team), ...vehicles];
  }

  visible(team, leaves) {
    const byId = new Map(leaves.map(unit => [unit.id, unit]));
    const grouped = new Set();
    const groups = [...this.groups[team].values()].map(group => {
      const members = group.units.map(id => byId.get(id)).filter(Boolean);
      members.forEach(member => grouped.add(member.id));
      return { ...group, members };
    });
    return [...leaves.filter(unit => !grouped.has(unit.id)), ...groups];
  }

  merge(team, ids) {
    if (!Array.isArray(ids) || ids.length < 2 || new Set(ids).size !== ids.length) {
      return { error: 'Select at least two different units.' };
    }
    const visible = new Map(this.visible(team, this.units(team)).map(unit => [unit.id, unit]));
    const selections = ids.map(id => visible.get(id));
    if (selections.some(unit => !unit)) return { error: 'Select units under your command.' };
    const units = selections.flatMap(unit => unit.units ?? [unit.id]);
    for (const id of ids) this.groups[team].delete(id);
    const number = ++this.groupNumber[team];
    const group = { id: 'group-' + number, label: 'Command Group ' + number, badge: 'G' + number, units, order: null };
    this.groups[team].set(group.id, group);
    return { message: units.length + ' units merged into ' + group.label + '.', selected: group.id };
  }

  orderFor(unit, kind, at, crew = null) {
    return { unit: unit.id, kind, x: at.x, z: at.z, crew, version: ++this.serial };
  }

  deploy(team) {
    this.deployTeam = team;
    for (const unit of this.units(team).filter(u => u.vehicle)) {
      const crew = this.closestCrew(unit.vehicle);
      if (!crew) continue;
      this.game.enter(crew, unit.vehicle);
      this.orders[team].set(unit.id, this.orderFor(unit, 'hold', unit.at, crew.id));
    }
    const side = TEAMS[team].side;
    const positions = this.game.points.filter(p => p.home === team && p.z !== 0);
    this.squads(team).forEach((unit, index) => {
      const base = positions[index];
      unit.members.forEach((player, n) => {
        const x = base.x + side * 9;
        const z = base.z + (n - .5 * (unit.members.length - 1)) * 4.1;
        player.body.position.set(x, heightAt(x, z) + player.halfY, z);
        player.body.velocity.setZero();
        player.body.aabbNeedsUpdate = true;
      });
      this.orders[team].set(unit.id, this.orderFor(unit, 'hold', base));
    });
  }

  send(player, raw) {
    if (raw?.kind === 'ballistic-target') return designateBallistic(this.game, player, raw);
    if (!player?.human || this.leaders[player.team] !== player.id) return { error: 'Only your team commander can issue orders.' };
    if (this.game.winner !== null) return { error: 'The round has ended.' };
    if (raw?.kind === 'support') return this.game.support.request(player, raw);
    const team = player.team;
    if (raw?.kind === 'merge') return this.merge(team, raw.units);
    if (raw?.kind === 'split') {
      if (!this.groups[team].delete(raw.unit)) return { error: 'Select one of your command groups.' };
      return { message: 'Group split. Its units kept their orders.' };
    }
    if (!raw || !['move', 'hold', 'release'].includes(raw.kind) || typeof raw.unit !== 'string') return { error: 'Choose a unit and an order.' };
    const unit = this.visible(team, this.units(team)).find(item => item.id === raw.unit);
    if (!unit) return { error: 'This unit is outside your command.' };
    if (raw.kind === 'move' && (!Number.isFinite(raw.x) || !Number.isFinite(raw.z) || !clearLand(raw.x, raw.z))) {
      return { error: 'Choose clear land for this unit’s destination.' };
    }
    if (unit.units) return this.sendGroup(team, unit, raw);
    return this.sendUnit(team, unit, raw, raw);
  }

  sendUnit(team, unit, raw, at) {
    const orders = this.orders[team];
    if (raw.kind === 'release') {
      orders.delete(unit.id);
      return { message: unit.label + ' returned to autonomous control.' };
    }
    if (!unit.available) return { error: 'This unit is unavailable.' };
    const vehicle = unit.vehicle;
    const crew = vehicle && (vehicle.driver ?? this.closestCrew(vehicle));
    if (vehicle && !crew) return { error: 'No AI crew is available for this vehicle.' };
    const target = raw.kind === 'move' ? at : unit.at;
    orders.set(unit.id, this.orderFor(unit, raw.kind, target, crew?.id));
    return { message: unit.label + (raw.kind === 'move' ? ' ordered to move.' : ' ordered to hold position.') };
  }

  sendGroup(team, group, raw) {
    const members = raw.kind === 'release' ? group.members : group.members.filter(unit => unit.available);
    if (!members.length) return { error: 'This group has no available units.' };
    const targets = raw.kind === 'move' ? formation(raw, members.length) : [];
    if (raw.kind === 'move' && targets.length !== members.length) return { error: 'There is not enough clear ground for this group.' };
    let issued = 0;
    members.forEach((unit, index) => {
      if (!this.sendUnit(team, unit, raw, targets[index]).error) issued++;
    });
    if (!issued) return { error: 'This group has no available crews.' };
    const saved = this.groups[team].get(group.id);
    saved.order = raw.kind === 'release' ? null : { kind: raw.kind, x: raw.x, z: raw.z };
    const action = raw.kind === 'move' ? ' moving.' : raw.kind === 'hold' ? ' holding.' : ' released to AI.';
    return { message: issued + ' of ' + group.units.length + ' units' + action };
  }

  refreshCrews() {
    this.boarding.clear();
    for (const v of this.game.vehicles) {
      this.orders[1 - v.team].delete(v.id);
      const order = this.orders[v.team].get(v.id);
      if (!order || v.dead || v.driver?.human) continue;
      if (v.driver) {
        order.crew = v.driver.id;
      } else {
        const reserved = this.game.players.find(p => p.id === order.crew);
        if (!reserved || reserved.human || reserved.dead || reserved.vehicle) order.crew = this.closestCrew(v)?.id ?? null;
        if (order.crew) this.boarding.set(order.crew, { vehicle: v, order });
      }
    }
  }

  guide(bot) {
    const orders = this.orders[bot.team];
    if (bot.vehicle) {
      const order = orders.get(bot.vehicle.id);
      if (!order) return null;
      return { ...order, stop: order.kind === 'hold' || (bot.vehicle.supportShip && !bot.vehicle.supportShip.ramp) };
    }
    const boarding = this.boarding.get(bot.id);
    if (boarding) {
      const { vehicle, order } = boarding;
      if (!vehicle.dead && !vehicle.driver && vehicle.team === bot.team) {
        const at = pointAt(vehicle);
        if (distance(at, pointAt(bot)) < 5.2 && Math.abs(at.y - pointAt(bot).y) < 3 && Math.abs(vehicle.speed) < 3) {
          this.game.enter(bot, vehicle);
          return { ...order, stop: order.kind === 'hold' };
        }
        return { x: at.x, z: at.z, version: -order.version, boarding: true };
      }
    }
    const order = orders.get(squadFor(bot));
    if (!order) return null;
    if (order.kind === 'hold') return { ...order, stop: true };
    const angle = bot.index * Math.PI * .47;
    const x = order.x + Math.cos(angle) * 6.9;
    const z = order.z + Math.sin(angle) * 6.9;
    return clearLand(x, z) ? { ...order, x, z } : order;
  }

  reset() {
    this.orders.forEach(orders => orders.clear());
    this.groups.forEach(groups => groups.clear());
    this.groupNumber.fill(0);
    if (this.deployTeam !== null && this.leaders[this.deployTeam]) this.deploy(this.deployTeam);
  }

  snapshot() {
    return { leaders: [...this.leaders], units: this.leaders.map((_, team) => {
      const leaves = this.units(team).map(unit => {
        const order = this.orders[team].get(unit.id);
        const vehicle = unit.vehicle;
        let status = 'Ready';
        if (vehicle?.dead) status = 'Respawning';
        else if (vehicle?.driver?.human) status = 'Player crew';
        else if (!unit.available) status = vehicle ? 'No AI crew' : 'No AI soldiers';
        else if (vehicle && order && !vehicle.driver) status = order.crew ? 'Crew boarding' : 'Awaiting crew';
        else if (vehicle?.supportShip && !vehicle.supportShip.ramp && order?.kind === 'move') status = 'Aboard transport';
        else if (order?.kind === 'hold') status = 'Holding';
        else if (order?.kind === 'move') {
          const arrived = unit.members ? unit.members.every(p => distance(pointAt(p), order) <= 13) : distance(unit.at, order) <= 9.5;
          status = arrived ? 'In position' : 'En route';
        }
        else if (vehicle?.driver) status = 'AI crew';
        else if (unit.members) status = unit.members.length + (unit.members.length === 1 ? ' soldier' : ' soldiers');
        return { id: unit.id, label: unit.label, badge: unit.badge, type: unit.type, x: small(unit.at.x), z: small(unit.at.z),
          available: unit.available, status,
          order: order && { kind: order.kind, x: small(order.x), z: small(order.z) } };
      });
      return this.visible(team, leaves).map(unit => {
        if (!unit.units) return unit;
        const ready = unit.members.filter(member => member.available);
        const center = ready.reduce((sum, member) => ({ x: sum.x + member.x / ready.length, z: sum.z + member.z / ready.length }),
          { x: 0, z: 0 });
        let status = ready.length + ' of ' + unit.units.length + ' units ready';
        if (unit.order?.kind === 'hold') status = 'Holding · ' + status;
        if (unit.order?.kind === 'move') {
          const arrived = ready.length && ready.every(member => member.status === 'In position');
          status = (arrived ? 'In position' : 'En route') + ' · ' + status;
        }
        return { id: unit.id, label: unit.label, badge: unit.badge, type: 'group', x: small(center.x), z: small(center.z),
          available: ready.length > 0, status, order: unit.order, canRelease: unit.members.some(member => member.order) };
      });
    }) };
  }
}
