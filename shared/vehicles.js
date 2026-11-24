import { Vec3 } from 'cannon-es';
import { ballisticAim } from './ballistics.js';
import { angleDelta, clamp, dockFor, forward, heading, heightAt, mix, WORLD } from './map.js';
import { DECK, VEHICLES } from './rules.js';

const AXIS = new Vec3(0, 1, 0);
const moveTowards = (value, target, maxDelta) => value + clamp(target - value, -maxDelta, maxDelta);

export function turnBody(entity) {
  entity.body.quaternion.setFromAxisAngle(AXIS, -entity.yaw);
  entity.body.aabbNeedsUpdate = true;
}

export function localToShip(ship, lx, lz) {
  const { x, z } = ship.body.position;
  const c = Math.cos(ship.yaw);
  const s = Math.sin(ship.yaw);
  return [x + c * lx - s * lz, z + s * lx + c * lz];
}

export function shipLocal(ship, x, z) {
  const dx = x - ship.body.position.x;
  const dz = z - ship.body.position.z;
  const c = Math.cos(ship.yaw);
  const s = Math.sin(ship.yaw);
  return [c * dx + s * dz, -s * dx + c * dz];
}

export function rampTip(ship) {
  const [x, z] = localToShip(ship, 0, DECK.stern + DECK.ramp - .8);
  return heightAt(x, z);
}

export function groundFor(sim, entity) {
  const { x, y, z } = entity.body.position;
  let ground = heightAt(x, z);
  let ship = null;
  let surface = ground < -.12 ? 'water' : 'land';
  if (surface === 'water') ground = entity.type === 'infantry' ? -.65 : -.72;
  for (const boat of sim.ships) {
    if (boat.dead) continue;
    const [lx, lz] = shipLocal(boat, x, z);
    if (Math.abs(lx) > DECK.halfWidth - entity.halfWidth * .5) continue;
    const deck = boat.body.position.y + DECK.y;
    const onDeck = lz >= DECK.bow && lz <= DECK.stern;
    const onRamp = boat.ramp && lz > DECK.stern && lz <= DECK.stern + DECK.ramp;
    if (onDeck && (entity.supportShip === boat || y >= deck + entity.halfY - .92)) {
      if (deck > ground) {
        ground = deck;
        ship = boat;
        surface = 'deck';
      }
    } else if (onRamp) {
      const slope = mix(deck, Math.max(.06, rampTip(boat)), (lz - DECK.stern) / DECK.ramp);
      if (slope >= ground && y + .88 >= slope + entity.halfY) {
        ground = slope;
        ship = boat;
        surface = 'ramp';
      }
    }
  }
  return { ground, ship, surface };
}

export function moveWalk(sim, player, dt) {
  const { w, s, a, d, boost, up, yaw, pitch } = player.input;
  const body = player.body;
  const support = groundFor(sim, player);
  const speed = support.surface === 'water' ? 4.5 : boost ? 10.8 : 7.25;
  const m = Math.max(1, Math.hypot(w - s, d - a));
  const [fx, fz] = forward(yaw);
  const dx = (fx * (w - s) - fz * (d - a)) * speed / m;
  const dz = (fz * (w - s) + fx * (d - a)) * speed / m;
  body.velocity.x = moveTowards(body.velocity.x, dx, dt * 51);
  body.velocity.z = moveTowards(body.velocity.z, dz, dt * 51);
  if (up && !player.jumpHeld && player.grounded && support.surface !== 'water') body.velocity.y = 5.5;
  player.jumpHeld = up;
  player.yaw = yaw;
  player.pitch = pitch;
  turnBody(player);
}

export function moveVehicle(sim, vehicle, dt) {
  const input = vehicle.driver?.input;
  const body = vehicle.body;
  const spec = vehicle.spec;
  vehicle.recoil *= Math.exp(-dt * (vehicle.type === 'tank' ? 5.8 : 8.1));
  const support = groundFor(sim, vehicle);
  if (vehicle.type === 'jet') {
    moveJet(vehicle, input, support, dt);
  } else {
    const throttle = (input?.w ?? 0) - (input?.s ?? 0) * .39;
    const wet = support.surface === 'water';
    const rate = wet ? spec.accel * .54 : spec.accel;
    const speed = wet ? 4.55 : spec.speed * (support.ship ? .36 : 1);
    const previous = vehicle.speed;
    const braking = Math.abs(throttle) < .05 || vehicle.speed * throttle < -.05;
    vehicle.speed = moveTowards(vehicle.speed, throttle * speed, dt * rate * (braking ? 2.25 : 1));
    const steer = (input?.d ?? 0) - (input?.a ?? 0);
    const steerForce = vehicle.type === 'tank' ? clamp(.61 + Math.abs(vehicle.speed) * .023, .61, .99)
      : Math.min(1, Math.abs(vehicle.speed) / 3.2);
    vehicle.yaw += steer * spec.steer * steerForce * (vehicle.speed < -.2 ? -1 : 1) * dt;
    const [fx, fz] = forward(vehicle.yaw);
    const grip = rate * dt * (vehicle.type === 'tank' ? 6.5 : 4.7);
    body.velocity.x = moveTowards(body.velocity.x, fx * vehicle.speed, grip);
    body.velocity.z = moveTowards(body.velocity.z, fz * vehicle.speed, grip);
    const { x, z } = body.position;
    const radius = vehicle.halfLength * .72;
    let slope = 0;
    let crossSlope = 0;
    if (support.surface === 'land') {
      slope = (heightAt(x + fx * radius, z + fz * radius) - heightAt(x - fx * radius, z - fz * radius)) / (2 * radius);
      const width = vehicle.halfWidth * .74;
      crossSlope = (heightAt(x - fz * width, z + fx * width) - heightAt(x + fz * width, z - fx * width)) / (2 * width);
    } else if (support.surface === 'ramp') {
      slope = Math.cos(angleDelta(vehicle.yaw, support.ship.yaw))
        * (support.ship.body.position.y + DECK.y - rampTip(support.ship)) / DECK.ramp;
    }
    vehicle.roll = moveTowards(vehicle.roll, clamp(crossSlope - steer * vehicle.speed * .0022, -.22, .22), .65 * dt);
    const suspension = clamp((vehicle.speed - previous) / dt * .006, -.08, .08);
    vehicle.pitch = moveTowards(vehicle.pitch, clamp(slope + suspension + vehicle.recoil * .022, -.28, .28), dt * .9);
  }
  if (input) {
    const arc = vehicle.type === 'ballistic' ? ballisticAim(vehicle, vehicle.target) : null;
    const aim = arc?.yaw ?? (vehicle.type === 'jet' ? vehicle.yaw : input.yaw);
    const traverse = vehicle.type === 'tank' ? 1.76 : 2.4;
    vehicle.turret += clamp(angleDelta(aim, vehicle.turret), -dt * traverse, dt * traverse);
    const pitch = vehicle.type === 'jet' ? vehicle.pitch : clamp(input.pitch, -.55, 1.08);
    vehicle.weaponPitch = vehicle.type === 'ballistic' ? moveTowards(vehicle.weaponPitch, arc?.pitch ?? .08, dt * 1.45) : pitch;
  }
  turnBody(vehicle);
}

function moveJet(jet, input, support, dt) {
  const body = jet.body;
  const { spec } = jet;
  const power = (input?.w ?? 0) - (input?.s ?? 0);
  const touching = !jet.airborne;
  const drag = touching ? (power > 0 ? .6 : 9.8) : 1.4 + (jet.speed / spec.speed) ** 2 * 3.1;
  jet.speed = clamp(jet.speed + (power * spec.accel * (input?.boost ? 1.23 : 1)
    - drag) * dt, 0, spec.speed);
  const steer = (input?.d ?? 0) - (input?.a ?? 0);
  const pitch = input?.up ? .34 : input?.down ? -.51 : (input?.pitch ?? 0) * .32;
  jet.pitch = moveTowards(jet.pitch, clamp(pitch, -.58, .5), dt * 1.08);
  jet.roll = moveTowards(jet.roll, jet.airborne ? -steer * .69 : 0, dt * 1.65);
  const turn = jet.airborne ? -Math.sin(jet.roll) / .637 : steer;
  jet.yaw += turn * spec.steer * dt * Math.min(1, .22 + jet.speed / 45);
  const [fx, fz] = forward(jet.yaw);
  body.velocity.x = fx * jet.speed;
  body.velocity.z = fz * jet.speed;
  if (touching && jet.speed >= spec.rotate && jet.pitch > .10 && support.surface === 'land') {
    jet.airborne = true;
    body.velocity.y = jet.speed * Math.sin(jet.pitch) * .63;
  }
  if (jet.airborne) {
    const stall = Math.max(0, (spec.rotate - 7) - jet.speed) * .43;
    const limit = Math.max(0, body.position.y - 155) * .75;
    const vertical = jet.speed * Math.sin(jet.pitch) - stall - limit - Math.abs(jet.roll) * 2.1;
    body.velocity.y = moveTowards(body.velocity.y, vertical + .48, dt * 26);
  }
}

export function changeRamp(sim, boat) {
  if (boat.ramp) {
    const occupied = [...sim.vehicles, ...sim.players].some(entity => !entity.dead && entity.supportShip === boat
      && shipLocal(boat, entity.body.position.x, entity.body.position.z)[1] > DECK.stern + .35);
    if (occupied) {
      sim.notice(boat.driver, 'Clear the ramp first.');
      return;
    }
    boat.ramp = false;
    sim.notice(boat.driver, 'Ramp secured. Transport can move.');
    return;
  }
  const berths = [dockFor(0), dockFor(1)];
  berths.push(...berths.map(berth => ({ ...berth, z: -Math.sign(berth.z) * 28 })));
  const near = berths.filter(berth => sim.ships.every(other => other === boat || other.dead
    || Math.hypot(other.body.position.x - berth.x, other.body.position.z - berth.z) > 25)).sort((a, b) => {
    const { x, z } = boat.body.position;
    return Math.hypot(a.x - x, a.z - z) - Math.hypot(b.x - x, b.z - z);
  })[0];
  if (Math.abs(boat.speed) < 1.7 && rampTip(boat) > .15) {
    boat.ramp = true;
    boat.speed = 0;
    sim.notice(boat.driver, 'Ramp down. Vehicles can roll off.');
  } else if (near && Math.hypot(near.x - boat.body.position.x, near.z - boat.body.position.z) < 64 && Math.abs(boat.speed) < 7) {
    boat.berth = near;
    boat.speed = 0;
    sim.notice(boat.driver, 'Berthing assist engaged.');
  } else {
    sim.notice(boat.driver, 'Slow down near a marked landing beach.');
  }
}

export function moveShip(sim, boat, dt) {
  const body = boat.body;
  boat.recoil *= Math.exp(-dt * 8.1);
  const beforeX = body.position.x;
  const beforeY = body.position.y;
  const beforeZ = body.position.z;
  const beforeYaw = boat.yaw;
  const input = boat.driver?.input;
  const throttle = (input?.w ?? 0) - (input?.s ?? 0) * .55;
  const turn = (input?.d ?? 0) - (input?.a ?? 0);
  if (boat.berth && (Math.abs(throttle) > .12 || Math.abs(turn) > .12 || !boat.driver)) boat.berth = null;
  if (boat.berth) {
    const berth = boat.berth;
    const dx = berth.x - beforeX;
    const dz = berth.z - beforeZ;
    const d = Math.hypot(dx, dz);
    boat.yaw += clamp(angleDelta(berth.yaw, boat.yaw), -.52 * dt, .52 * dt);
    if (d > .08) {
      const step = Math.min(5.1 * dt, d);
      const x = beforeX + dx / d * step;
      const z = beforeZ + dz / d * step;
      if (sim.ships.some(other => other !== boat && !other.dead
        && Math.hypot(other.body.position.x - x, other.body.position.z - z) < 21)) {
        boat.berth = null;
        sim.notice(boat.driver, 'Berth obstructed. Try the other landing lane.');
      } else {
        body.position.x = x;
        body.position.z = z;
      }
    }
    if (boat.berth && d < .48 && Math.abs(angleDelta(berth.yaw, boat.yaw)) < .05) {
      boat.berth = null;
      boat.ramp = true;
      sim.notice(boat.driver, 'Ramp down. Vehicles can roll off.');
    }
  } else if (!boat.ramp) {
    boat.speed = moveTowards(boat.speed, throttle * boat.spec.speed, boat.spec.accel * dt);
    boat.yaw += turn * boat.spec.steer * dt * (.48 + Math.min(.52, Math.abs(boat.speed) * .15));
    const [fx, fz] = forward(boat.yaw);
    const x = beforeX + fx * boat.speed * dt;
    const z = beforeZ + fz * boat.speed * dt;
    const clear = sim.ships.every(other => other === boat || other.dead
      || Math.hypot(other.body.position.x - x, other.body.position.z - z) > 21);
    if (heightAt(x, z) < -1.4 && Math.abs(x) < WORLD.x - 13 && Math.abs(z) < WORLD.z - 16 && clear) {
      body.position.x = x;
      body.position.z = z;
    } else {
      boat.speed = moveTowards(boat.speed, 0, dt * 15);
    }
  }
  body.position.y = .26 + Math.sin(sim.time * 1.6 + boat.team * 1.6) * .07;
  boat.turret += clamp(angleDelta(input?.yaw ?? boat.yaw, boat.turret), -dt * 2.2, dt * 2.2);
  boat.weaponPitch = clamp(input?.pitch ?? 0, -.4, .75);
  turnBody(boat);

  const rotated = boat.yaw - beforeYaw;
  const c = Math.cos(rotated);
  const s = Math.sin(rotated);
  for (const entity of [...sim.vehicles, ...sim.players]) {
    if (entity.supportShip !== boat || entity.dead || entity.vehicle) continue;
    const position = entity.body.position;
    const x = position.x - beforeX;
    const z = position.z - beforeZ;
    position.set(body.position.x + c * x - s * z, position.y + body.position.y - beforeY,
      body.position.z + s * x + c * z);
    entity.yaw += rotated;
    if (entity.turret !== undefined) entity.turret += rotated;
    entity.body.aabbNeedsUpdate = true;
  }
}

export function settle(sim, entity) {
  const body = entity.body;
  const { ground, ship, surface } = groundFor(sim, entity);
  const floor = ground + entity.halfY;
  entity.grounded = body.position.y <= floor + .075 && body.velocity.y <= .52;
  if (entity.grounded) {
    if (entity.type === 'jet' && entity.airborne && (body.velocity.y < -15 || surface === 'water')) {
      sim.damage(entity, entity.hp + 1, null);
      return;
    }
    body.position.y = floor;
    body.velocity.y = 0;
    if (entity.type === 'jet') entity.airborne = false;
  }
  entity.supportShip = entity.grounded ? ship : null;
  body.position.x = clamp(body.position.x, -WORLD.x + 2, WORLD.x - 2);
  body.position.z = clamp(body.position.z, -WORLD.z + 2, WORLD.z - 2);
  body.aabbNeedsUpdate = true;
}
