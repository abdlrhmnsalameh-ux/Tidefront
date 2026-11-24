import { Vec3 } from 'cannon-es';
import { launchProjectile } from './combat.js';
import { heightAt, TEAMS, WORLD } from './map.js';
import { ARMS, TEAM_SIZE } from './rules.js';

export const PURCHASES = {
  rifles: { label: 'Rifle fireteam', cost: 200 },
  tank: { label: 'Tank detachment', cost: 350 },
  launcher: { label: 'Missile detachment', cost: 400 },
  ballistic: { label: 'Meridian detachment', cost: 625 },
  strike: { label: 'Kestrel strike squadron', cost: 450 },
};
export const REWARDS = { capture: 250, down: 100 };
const FLIGHT_TIME = 7.2;

export class Support {
  constructor(game) {
    this.game = game;
    this.credits = [0, 0];
    this.hired = [{}, {}];
    this.queue = [[], []];
    this.nextArrival = 0;
    this.strikes = [null, null];
  }

  award(team, reason) {
    this.credits[team] += REWARDS[reason];
  }

  request(player, order) {
    const type = order.support;
    if (typeof type !== 'string' || !Object.hasOwn(PURCHASES, type)) return { error: 'Choose a support unit.' };
    const item = PURCHASES[type];
    const team = player.team;
    const count = this.hired[team][type] ?? 0;
    if (type === 'strike' && this.strikes[team]) return { error: 'The squadron is still in the air.' };
    if (this.credits[team] < item.cost) return { error: 'Earn more requisition points.' };
    let message = item.label + ' inbound.';
    if (type === 'strike') {
      const { x, z } = order;
      if (!Number.isFinite(x) || !Number.isFinite(z) || Math.abs(x) > WORLD.x - 12 || Math.abs(z) > WORLD.z - 12) {
        return { error: 'Mark a point inside the battlefield.' };
      }
      this.strikes[team] = { player, x, z, started: this.game.time, launched: 0 };
      this.game.emit('support', { x, y: Math.max(0, heightAt(x, z)), z }, { team, label: 'Kestrel squadron inbound' });
    } else {
      const pad = this.queue[team].length ? null : this.freePad(team);
      if (pad) {
        this.deploy(team, type, count, pad);
        message = item.label + ' arrived at Command.';
      } else {
        this.queue[team].push({ type, count });
        message = item.label + ' queued. Clear a Command pad for arrival.';
      }
    }
    this.credits[team] -= item.cost;
    this.hired[team][type] = count + 1;
    return { message };
  }

  freePad(team) {
    const side = TEAMS[team].side;
    const x = side * 370;
    const blocking = [...this.game.vehicles, ...this.game.players].filter(entity => !entity.dead && !entity.vehicle);
    for (const z of [23, 38, 53, 68, -53, -69]) {
      if (blocking.every(entity => Math.hypot(entity.body.position.x - x, entity.body.position.z - z) > 8)) return { x, z };
    }
    return null;
  }

  deploy(team, type, count, pad) {
    const game = this.game;
    const index = TEAM_SIZE + game.players.filter(p => p.team === team && p.index >= TEAM_SIZE).length;
    const id = 'reinforcement-' + (count + 1);
    const members = type === 'rifles' ? 2 : 1;
    const squad = [];
    for (let i = 0; i < members; i++) {
      const player = game.addPlayer(team, index + i);
      player.fireteam = type === 'rifles' ? id : null;
      const x = pad.x + 2.5 * i;
      player.body.position.set(x, heightAt(x, pad.z) + player.halfY, pad.z);
      player.body.aabbNeedsUpdate = true;
      game.players.push(player);
      squad.push(player);
    }
    let unit = id;
    let crew = null;
    if (type !== 'rifles') {
      const vehicle = game.addVehicle({ ...pad, type, team, yaw: -TEAMS[team].side * Math.PI / 2, reinforcement: true },
        '-support-' + team + '-' + type + '-' + count);
      game.vehicles.push(vehicle);
      game.enter(squad[0], vehicle);
      unit = vehicle.id;
      crew = squad[0].id;
    }
    game.command.orders[team].set(unit, game.command.orderFor({ id: unit }, 'hold', pad, crew));
  }

  flight(strike, team, index, age) {
    const heading = -TEAMS[team].side;
    return { id: 'strike-' + team + '-' + index, team, x: strike.x + heading * (age * 82 - 282 - index * 13),
      y: 49 + index * 4 + .8 * Math.sin(age), z: strike.z + (index - 1) * 13,
      yaw: heading * Math.PI / 2 };
  }

  tick() {
    if (this.game.time >= this.nextArrival) {
      this.nextArrival = this.game.time + .4;
      for (let team = 0; team < 2; team++) {
        if (!this.queue[team].length) continue;
        const pad = this.freePad(team);
        if (!pad) continue;
        const { type, count } = this.queue[team].shift();
        this.deploy(team, type, count, pad);
        const leader = this.game.players.find(player => player.id === this.game.command.leaders[team]);
        this.game.notice(leader, PURCHASES[type].label + ' arrived at Command.');
      }
    }
    for (let team = 0; team < 2; team++) {
      const strike = this.strikes[team];
      if (!strike) continue;
      const age = this.game.time - strike.started;
      if (age >= FLIGHT_TIME) {
        this.strikes[team] = null;
        continue;
      }
      while (strike.launched < 3 && age >= 2.2 + strike.launched * .21) {
        const i = strike.launched++;
        const from = this.flight(strike, team, i, age);
        const x = strike.x + (i - 1) * 5;
        const z = strike.z + (i - 1) * 8;
        const altitude = Math.max(0, heightAt(x, z));
        const flightSeconds = 1.2;
        const position = new Vec3(from.x, from.y - .8, from.z);
        const velocity = new Vec3((x - position.x) / flightSeconds,
          (altitude - position.y) / flightSeconds + ARMS.missile.fall * flightSeconds * .5,
          (z - position.z) / flightSeconds);
        launchProjectile(this.game, 'missile', strike.player, null, position, velocity);
      }
    }
  }

  snapshot() {
    const flights = this.strikes.flatMap((strike, team) => strike
      ? [0, 1, 2].map(i => this.flight(strike, team, i, this.game.time - strike.started)) : []);
    return { credits: [...this.credits], hired: this.hired.map(tally => ({ ...tally })),
      queued: this.queue.map(queue => queue.length),
      strikes: this.strikes.map(strike => strike && { x: strike.x, z: strike.z, inbound: strike.launched < 3 }), flights };
  }

  reset() {
    this.credits.fill(0);
    this.hired = [{}, {}];
    this.queue = [[], []];
    this.nextArrival = 0;
    this.strikes.fill(null);
    const game = this.game;
    for (const p of game.players.filter(p => p.index >= TEAM_SIZE)) {
      if (p.vehicle) game.exit(p, true);
      game.world.removeBody(p.body);
    }
    for (const v of game.vehicles.filter(v => v.spawn.reinforcement)) {
      if (v.driver) game.exit(v.driver, true);
      game.world.removeBody(v.body);
    }
    game.players = game.players.filter(p => p.index < TEAM_SIZE);
    game.vehicles = game.vehicles.filter(v => !v.spawn.reinforcement);
  }
}
