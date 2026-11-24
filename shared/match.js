import { Body, Box, SAPBroadphase, Vec3, World } from 'cannon-es';
import { ARMS, CAPTURE_SECONDS, DECK, emptyInput, HOLD_SECONDS, readInput, RESPAWN_SECONDS, STEP, TEAM_SIZE, VEHICLES } from './rules.js';
import { clamp, forward, heightAt, OBSTACLES, POINTS, seededRandom, TEAMS, VEHICLE_SPAWNS } from './map.js';
import { botControl } from './navigation.js';
import { advanceShots, fireWeapons } from './combat.js';
import { changeRamp, groundFor, localToShip, moveShip, moveVehicle, moveWalk, settle, turnBody } from './vehicles.js';
import { CommandBook } from './command.js';
import { Support } from './support.js';

const round = n => Math.round(n * 100) / 100;
const wrap = n => Math.atan2(Math.sin(n), Math.cos(n));

export class Match {
  constructor(seed = 9331) {
    this.time = 0;
    this.serial = 0;
    this.round = 1;
    this.random = seededRandom(seed);
    this.hold = [0, 0];
    this.winner = null;
    this.finishedAt = 0;
    this.events = [];
    this.projectiles = [];
    this.points = POINTS.map(p => ({ ...p, owner: p.home, progress: 0, claimant: null, contested: false }));
    this.world = new World({ gravity: new Vec3(0, -13, 0), allowSleep: false });
    this.world.broadphase = new SAPBroadphase(this.world);
    this.world.defaultContactMaterial.friction = .05;
    this.world.defaultContactMaterial.restitution = .015;
    this.world.solver.iterations = 6;
    for (const b of OBSTACLES) {
      this.world.addBody(new Body({
        position: new Vec3(b.x, heightAt(b.x, b.z) + b.h * .5, b.z),
        mass: 0, shape: new Box(new Vec3(b.w * .5, b.h * .5, b.d * .5)),
      }));
    }
    this.vehicles = VEHICLE_SPAWNS.map((spawn, index) => this.addVehicle(spawn, index));
    this.ships = this.vehicles.filter(v => v.type === 'transport');
    this.players = TEAMS.flatMap((_, team) => Array.from({ length: TEAM_SIZE }, (_, index) => this.addPlayer(team, index)));
    this.command = new CommandBook(this);
    this.support = new Support(this);
  }

  addBody(entity, width, height, length, mass) {
    const shape = new Box(new Vec3(width / 2, height / 2, length / 2));
    const body = new Body({ mass, shape, linearDamping: .035, fixedRotation: true });
    body.entity = entity;
    this.world.addBody(body);
    entity.body = body;
    entity.halfWidth = width / 2;
    entity.halfY = height / 2;
    entity.halfLength = length / 2;
    return body;
  }

  addVehicle(spawn, index) {
    const { type, team } = spawn;
    const spec = VEHICLES[type];
    const v = { id: 'v' + index, type, team, spec, spawn, cooldowns: {}, driver: null, supportShip: null };
    if (type === 'transport') {
      const body = this.addBody(v, spec.w, 1.38, spec.l, 0);
      body.shapeOffsets[0].y = -.51;
      body.addShape(new Box(new Vec3(4.7, 1.37, 2.8)), new Vec3(0, 2.92, -11.2));
    } else {
      this.addBody(v, type === 'jet' ? 3.55 : spec.w, spec.h, spec.l, spec.mass);
    }
    this.resetVehicle(v);
    return v;
  }

  resetVehicle(v) {
    const { x, z, yaw } = v.spawn;
    v.body.position.set(x, v.type === 'transport' ? .26 : heightAt(x, z) + v.halfY, z);
    v.body.velocity.setZero();
    v.body.collisionFilterMask = -1;
    v.yaw = v.turret = yaw;
    v.pitch = v.roll = v.speed = v.weaponPitch = v.recoil = 0;
    v.airborne = v.dead = false;
    v.grounded = true;
    v.hp = v.spec.hp;
    v.driver = v.berth = v.supportShip = null;
    v.target = null;
    v.ramp = v.type === 'transport';
    v.cooldowns = {};
    turnBody(v);
  }

  addPlayer(team, index) {
    const p = { id: `t${team}p${index}`, type: 'infantry', team, index, human: false,
      name: `${TEAMS[team].name} ${String(index + 1).padStart(2, '0')}`, kills: 0, deaths: 0, score: 0 };
    this.addBody(p, .73, 1.77, .73, 85);
    this.spawnPlayer(p, true);
    return p;
  }

  spawnPlayer(p, atCommand = false) {
    const holdings = this.points.filter(point => point.home === p.team && point.owner === p.team);
    const home = this.points[p.team * 3];
    const point = (atCommand && (p.human || p.index < 4) ? home : holdings[p.index % Math.max(1, holdings.length)]) ?? home;
    const side = TEAMS[p.team].side;
    const reserveCell = (p.index - TEAM_SIZE) % 35;
    const offset = p.index < TEAM_SIZE ? 8.8 + (p.index % 3) * 3.1 : 20 + Math.floor(reserveCell / 7) * 3.2;
    const spread = p.index < TEAM_SIZE ? (p.index - 3.5) * 3.1 : (reserveCell % 7 - 3) * 3.2;
    const x = holdings.length || atCommand ? point.x - side * offset : side * 441;
    const z = point.z + spread;
    p.body.position.set(x, heightAt(x, z) + p.halfY, z);
    p.body.velocity.setZero();
    p.body.collisionFilterMask = -1;
    p.yaw = -side * Math.PI / 2;
    p.pitch = 0;
    p.hp = 100;
    p.ammo = { rifle: ARMS.rifle.capacity, rocket: ARMS.rocket.capacity };
    p.slot = 1;
    p.reloadUntil = 0;
    p.cooldowns = {};
    p.dead = false;
    p.vehicle = null;
    p.grounded = true;
    p.jumpHeld = false;
    p.supportShip = null;
    p.graceUntil = this.time + 1.7;
    p.pendingActions = 0;
    p.lastInput = this.time;
    p.input = { ...emptyInput(p.yaw), seq: p.input?.seq ?? -1 };
    p.path = [];
    p.nextPlan = this.time + this.random() * 1.75;
    turnBody(p);
  }

  join(name, preferred) {
    const counts = [0, 1].map(team => this.players.filter(p => p.team === team && p.human).length);
    const team = (preferred === 0 || preferred === 1) && counts[preferred] < TEAM_SIZE
      ? preferred : (counts[0] <= counts[1] ? 0 : 1);
    const p = this.players.find(candidate => candidate.team === team && candidate.index < TEAM_SIZE && !candidate.human);
    if (!p) return null;
    if (p.vehicle) this.exit(p, true);
    p.human = true;
    p.name = name || 'Operator';
    p.kills = p.deaths = p.score = 0;
    p.input.seq = -1;
    this.spawnPlayer(p, true);
    this.command.claim(p);
    return p;
  }

  leave(p) {
    if (p.vehicle) this.exit(p, true);
    p.human = false;
    p.name = `${TEAMS[p.team].name} ${String(p.index + 1).padStart(2, '0')}`;
    p.kills = p.deaths = p.score = 0;
    this.spawnPlayer(p);
    this.command.leave(p);
  }

  input(p, raw) {
    const next = readInput(raw);
    if (!p?.human || !next || next.seq <= p.input.seq) return;
    p.pendingActions |= next.action;
    p.lastInput = this.time;
    p.input = next;
  }

  closestVehicle(p, bot = false) {
    const at = p.body.position;
    let best = null;
    let rank = Infinity;
    for (const v of this.vehicles) {
      if (v.dead || v.driver || Math.abs(v.speed) > 3.1 || v.airborne || (bot && (v.spawn.reserve || p.team !== v.team || v.type === 'jet' || v.type === 'transport'))) continue;
      const distance = Math.hypot(v.body.position.x - at.x, v.body.position.z - at.z);
      const limit = v.type === 'transport' ? 18 : v.type === 'jet' ? 9 : bot ? 12 : 5.8;
      if (distance > limit || Math.abs(v.body.position.y - at.y) > 4.2) continue;
      if (distance >= rank) continue;
      best = v;
      rank = distance;
    }
    return best;
  }

  enter(p, v) {
    if (p.dead || p.vehicle || v.dead || v.driver) return;
    v.driver = p;
    if (v.type === 'ballistic') v.target = null;
    v.team = p.team;
    p.vehicle = v;
    p.supportShip = null;
    p.body.collisionFilterMask = 0;
    p.body.velocity.setZero();
    p.body.position.copy(v.body.position);
    this.emit('mount', v.body.position, { who: p.id, vehicle: v.id, yaw: v.yaw });
  }

  exit(p, force = false) {
    const v = p.vehicle;
    if (!v) return;
    if (!force && (v.airborne || Math.abs(v.speed) > (v.type === 'transport' ? 1.8 : 7.4))) {
      this.notice(p, 'Stop on the ground to dismount.');
      return;
    }
    const body = p.body;
    const [fx, fz] = forward(v.yaw);
    const distance = v.type === 'jet' ? 4.2 : v.halfWidth + .85;
    const [x, z] = v.type === 'transport' ? localToShip(v, 4.7, 3.8) : [v.body.position.x - fz * distance, v.body.position.z + fx * distance];
    body.position.set(x, v.body.position.y + p.halfY, z);
    body.position.y = groundFor(this, p).ground + p.halfY;
    body.velocity.setZero();
    body.collisionFilterMask = -1;
    body.aabbNeedsUpdate = true;
    v.driver = p.vehicle = null;
    this.emit('dismount', body.position, { who: p.id, yaw: v.yaw });
  }

  emit(type, at, data = {}) {
    this.events.push({ id: ++this.serial, t: round(this.time), type, x: round(at.x), y: round(at.y), z: round(at.z), ...data });
  }

  notice(player, text) {
    if (player?.human) this.emit('notice', player.body.position, { who: player.id, text });
  }

  damage(entity, amount, owner) {
    if (entity.dead || (owner && entity.team === owner.team) || (entity.graceUntil ?? 0) > this.time) return;
    entity.hp = Math.max(0, entity.hp - amount);
    if (entity.hp > 0) return;
    entity.dead = true;
    entity.supportShip = null;
    entity.body.collisionFilterMask = 0;
    entity.body.velocity.setZero();
    entity.respawnAt = this.time + (entity.type === 'infantry' ? RESPAWN_SECONDS : 19);
    if (entity.type !== 'infantry') {
      this.emit('blast', entity.body.position, { radius: entity.type === 'transport' ? 12 : 8 });
      const driver = entity.driver;
      if (driver) {
        this.exit(driver, true);
        driver.graceUntil = 0;
        this.damage(driver, 150, owner);
      }
    } else {
      entity.deaths++;
      if (owner) { owner.kills++; owner.score += 100; this.support.award(owner.team, 'down'); }
      this.emit('down', entity.body.position, { who: entity.id, by: owner?.name ?? 'Impact', byId: owner?.id, name: entity.name });
    }
  }

  capture(dt) {
    for (const point of this.points) {
      const units = [[], []];
      for (const p of this.players) {
        if (p.dead || p.vehicle?.type === 'transport' || p.vehicle?.airborne) continue;
        const { x, z } = (p.vehicle ?? p).body.position;
        if ((x - point.x) ** 2 + (z - point.z) ** 2 < point.radius ** 2) units[p.team].push(p);
      }
      point.contested = units[0].length > 0 && units[1].length > 0;
      if (point.contested) continue;
      const challenger = units[0].length ? 0 : units[1].length ? 1 : null;
      if (challenger === null || challenger === point.owner) {
        point.progress = Math.max(0, point.progress - dt / 10);
      } else {
        if (point.claimant !== challenger) point.progress = 0;
        point.claimant = challenger;
        point.progress += dt / CAPTURE_SECONDS * (1 + .29 * Math.min(3, units[challenger].length - 1));
        if (point.progress >= 1) {
          point.owner = challenger;
          point.claimant = null;
          point.progress = 0;
          for (const p of units[challenger]) p.score += 250;
          this.support.award(challenger, 'capture');
          this.emit('captured', { x: point.x, y: heightAt(point.x, point.z), z: point.z }, { point: point.id, team: challenger });
        }
      }
      if (point.progress === 0) point.claimant = null;
    }
    for (let team = 0; team < 2; team++) {
      const controlsEnemy = this.points.every(p => p.home === team || p.owner === team);
      this.hold[team] = controlsEnemy ? this.hold[team] + dt : 0;
      if (this.hold[team] >= HOLD_SECONDS && this.winner === null) {
        this.winner = team;
        this.finishedAt = this.time;
        this.emit('won', { x: 0, y: 0, z: 0 }, { team });
      }
    }
  }

  restart() {
    this.round++;
    this.winner = null;
    this.hold.fill(0);
    this.projectiles = [];
    this.support.reset();
    for (const point of this.points) Object.assign(point, { owner: point.home, claimant: null, contested: false, progress: 0 });
    for (const v of this.vehicles) { v.team = v.spawn.team; this.resetVehicle(v); }
    for (const p of this.players) { p.kills = p.deaths = p.score = 0; this.spawnPlayer(p, true); }
    this.command.reset();
  }

  step(dt = STEP) {
    this.time += dt;
    this.events = this.events.filter(event => this.time - event.t < 1.3);
    if (this.winner !== null) return;
    this.command.refreshCrews();
    for (const p of this.players) {
      if (p.dead) {
        if (p.respawnAt <= this.time) this.spawnPlayer(p);
        continue;
      }
      if (!p.human) botControl(this, p);
      if (p.human && this.time - p.lastInput > .7) p.input = { ...emptyInput(p.yaw), seq: p.input.seq };
      p.input.action = p.pendingActions;
      p.pendingActions = 0;
      if (p.input.action & 1) {
        if (p.vehicle) this.exit(p);
        else {
          const v = this.closestVehicle(p);
          if (v) this.enter(p, v);
        }
      }
      if (p.input.action & 2 && p.vehicle?.type === 'transport') changeRamp(this, p.vehicle);
      if (!p.vehicle) moveWalk(this, p, dt);
      fireWeapons(this, p);
    }
    for (const v of this.vehicles) {
      if (v.dead) {
        if (v.respawnAt <= this.time) {
          if (v.spawn.reinforcement) {
            const pad = this.support.freePad(v.spawn.team);
            if (!pad) {
              v.respawnAt = this.time + .8;
              continue;
            }
            Object.assign(v.spawn, pad);
          }
          v.team = v.spawn.team;
          this.resetVehicle(v);
        }
        continue;
      }
      if (v.type === 'transport') moveShip(this, v, dt);
      else moveVehicle(this, v, dt);
    }
    this.world.step(dt);
    for (const v of this.vehicles) if (!v.dead && v.type !== 'transport') settle(this, v);
    for (const p of this.players) {
      if (p.dead) continue;
      if (p.vehicle) { p.body.position.copy(p.vehicle.body.position); p.body.velocity.setZero(); }
      else settle(this, p);
    }
    advanceShots(this, dt);
    this.support.tick();
    this.capture(dt);
  }

  snapshot() {
    return {
      time: round(this.time), round: this.round, hold: this.hold.map(round), winner: this.winner,
      command: this.command.snapshot(),
      support: this.support.snapshot(),
      points: this.points.map(p => [p.owner, p.claimant, round(p.progress), p.contested]),
      players: this.players.map(p => {
        const { x, y, z } = p.body.position;
        return [p.id, p.team, p.name, round(x), round(y), round(z), round(wrap(p.yaw)), round(p.pitch),
          Math.ceil(p.hp), p.vehicle?.id ?? null, p.dead ? round(p.respawnAt) : null, p.human, p.kills, p.deaths, p.score,
          p.slot, p.ammo.rifle, p.ammo.rocket, round(p.reloadUntil), round(Math.hypot(p.body.velocity.x, p.body.velocity.z)), p.body.position.y < .41,
          p.dead || p.vehicle ? null : this.closestVehicle(p)?.id ?? null];
      }),
      vehicles: this.vehicles.map(v => {
        const { x, y, z } = v.body.position;
        return [v.id, v.type, v.team, round(x), round(y), round(z), round(wrap(v.yaw)), round(v.pitch),
          Math.ceil(v.hp), v.driver?.id ?? null, v.dead, round(wrap(v.turret)), round(v.roll),
          round(v.speed), v.airborne, v.ramp, v.berth !== null, round(v.weaponPitch), v.supportShip?.id ?? null, round(v.recoil),
          v.target, v.type === 'ballistic' ? v.cooldowns.ballistic ?? 0 : 0];
      }),
      shots: this.projectiles.map(s => [s.id, s.kind, round(s.position.x), round(s.position.y), round(s.position.z),
        round(s.velocity.x), round(s.velocity.y), round(s.velocity.z)]),
      events: this.events,
    };
  }
}

export { DECK, STEP };
