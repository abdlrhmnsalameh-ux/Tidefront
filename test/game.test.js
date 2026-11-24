import assert from 'node:assert/strict';
import test from 'node:test';
import { Match, STEP } from '../shared/match.js';
import { heightAt } from '../shared/map.js';
import { pathBetween } from '../shared/navigation.js';
import { CAPTURE_SECONDS, HOLD_SECONDS, VEHICLES } from '../shared/rules.js';
import { shipLocal } from '../shared/vehicles.js';

function fixture() {
  const game = new Match();
  let seq = 0;
  for (const player of game.players) player.human = true;
  function advance(frames, controls = []) {
    for (let i = 0; i < frames; i++) {
      for (const [player, input] of controls) {
        game.input(player, { seq: ++seq, yaw: player.yaw, ...(typeof input === 'function' ? input(i) : input) });
      }
      game.step();
    }
  }
  return { game, advance };
}

function place(entity, x, z, yaw = 0) {
  entity.body.position.set(x, heightAt(x, z) + entity.halfY, z);
  entity.body.velocity.setZero();
  entity.yaw = yaw;
  entity.graceUntil = 0;
  entity.body.aabbNeedsUpdate = true;
}

test('the sea separates two usable, distinct land crossings', () => {
  assert.ok(heightAt(0, 0) < -6);
  for (const lane of [-326, 326]) {
    const path = pathBetween(-307, lane, 307, lane);
    assert.ok(path.length > 10);
    assert.ok(path.every(p => heightAt(p.x, p.z) > .12));
    assert.ok(path.some(p => Math.abs(p.x) < 30 && p.z * lane > 0));
  }
});

test('on-foot controls advance, jump and swim using the same input path', () => {
  const { game, advance } = fixture();
  const p = game.players[0];
  place(p, -244, 0);
  advance(32, [[p, { w: 1 }]]);
  assert.ok(p.body.position.z < -6);
  const y = p.body.position.y;
  advance(8, [[p, { up: true }]]);
  assert.ok(p.body.position.y > y + .35);
  place(p, 0, 0, Math.PI / 2);
  advance(125, [[p, { w: 1, yaw: Math.PI / 2 }]]);
  assert.ok(p.body.position.x > 13);
  assert.ok(Math.abs(p.body.position.y - .235) < .02);
});

test('automatic weapons damage opponents, reload and allow respawns', () => {
  const { game, advance } = fixture();
  const p = game.players[0];
  const target = game.players[8];
  place(p, -253, 17);
  place(target, -253, -2);
  advance(41, [[p, { fire: true }]]);
  assert.equal(target.dead, true);
  assert.equal(p.kills, 1);
  assert.ok(p.ammo.rifle < 30);
  advance(53, [[p, i => ({ action: i === 0 ? 4 : 0 })]]);
  assert.equal(p.ammo.rifle, 30);
  advance(151);
  assert.equal(target.dead, false);
  assert.equal(target.hp, 100);
});

test('the RPG and all armed vehicle stations fire projectiles and explosive shots deal damage', () => {
  const { game, advance } = fixture();
  const p = game.players[0];
  const target = game.vehicles.find(v => v.team === 1 && v.type === 'tank');
  place(p, -253, 20);
  place(target, -253, -.6);
  advance(22, [[p, { slot: 2, fire: true }]]);
  assert.ok(target.hp < target.spec.hp);
  assert.ok(game.events.some(e => e.type === 'blast'));
  const arms = [];
  for (const type of Object.keys(VEHICLES)) {
    const v = game.vehicles.find(v => v.team === 0 && v.type === type);
    game.enter(p, v);
    advance(1, [[p, { fire: true, alt: true, yaw: v.yaw }]]);
    const events = game.events.filter(e => e.type === 'fire' && e.shooter === p.id).slice(-2);
    arms.push(...events.map(e => e.kind));
    game.exit(p, true);
  }
  for (const kind of ['gun', 'cannon', 'salvo', 'airgun', 'missile']) assert.ok(arms.includes(kind), kind);
});

test('the fighter accelerates on the runway, takes off, turns and descends', () => {
  const { game, advance } = fixture();
  const p = game.players[0];
  const jet = game.vehicles.find(v => v.type === 'jet');
  game.enter(p, jet);
  advance(111, [[p, { w: 1, up: true }]]);
  assert.ok(jet.airborne && jet.body.position.y > 19 && jet.speed > 60);
  const yaw = jet.yaw;
  const y = jet.body.position.y;
  advance(60, [[p, { d: .7, down: true, s: .28 }]]);
  assert.ok(jet.yaw - yaw > .5);
  assert.ok(jet.body.position.y < y);
});

test('three ground vehicle types drive aboard, cross the sea, berth and unload', () => {
  const { game, advance } = fixture();
  const boat = game.ships[0];
  const cargo = ['tank', 'recon', 'launcher'].map((type, i) => {
    const v = game.vehicles.find(vehicle => vehicle.type === type);
    const p = game.players[i];
    place(v, -162, boat.body.position.z + (i - 1) * 4.02, Math.PI / 2);
    game.enter(p, v);
    return [p, v];
  });
  const position = v => shipLocal(boat, v.body.position.x, v.body.position.z);
  advance(278, cargo.map(([p, v]) => [p, () => ({ w: position(v)[1] > 7 ? .86 : 0 })]));
  assert.ok(cargo.every(([, v]) => v.supportShip === boat && position(v)[1] < 10));
  const offsets = cargo.map(([, v]) => position(v));
  for (const [p] of cargo) game.exit(p, true);
  const skipper = game.players[4];
  game.enter(skipper, boat);
  advance(1, [[skipper, { action: 2 }]]);
  assert.equal(boat.ramp, false);
  advance(580, [[skipper, { w: 1 }]]);
  advance(136, [[skipper, {}]]);
  assert.ok(boat.body.position.x > 110);
  assert.ok(cargo.every(([, v]) => v.supportShip === boat));
  advance(1, [[skipper, { action: 2 }]]);
  advance(296, [[skipper, {}]]);
  assert.equal(boat.ramp, true);
  cargo.forEach(([p, v], i) => {
    assert.ok(v.supportShip === boat);
    assert.ok(Math.hypot(...position(v).map((value, j) => value - offsets[i][j])) < .2);
    game.enter(p, v);
  });
  advance(650, cargo.map(([p, v]) => [p, () => ({ s: v.body.position.x < 166 ? 1 : 0 })]));
  assert.ok(cargo.every(([, v]) => v.supportShip === null && v.body.position.x > 163 && !v.dead));
});

test('capture is contested, then the team wins only after the full hold', () => {
  const { game, advance } = fixture();
  const enemy = game.points.filter(point => point.home === 1);
  game.players.forEach(p => place(p, p.team === 0 ? -435 : 435, -278 + p.index * 8));
  enemy.forEach((point, i) => place(game.players[i], point.x + 9, point.z));
  place(game.players[8], enemy[0].x - 9, enemy[0].z);
  advance(Math.ceil((CAPTURE_SECONDS + .3) / STEP));
  assert.equal(enemy[0].contested, true);
  assert.equal(enemy[0].owner, 1);
  assert.equal(enemy[1].owner, 0);
  assert.equal(enemy[2].owner, 0);
  place(game.players[8], 435, -280);
  advance(Math.ceil((CAPTURE_SECONDS + .2) / STEP));
  assert.equal(enemy[0].owner, 0);
  assert.equal(game.winner, null);
  advance(Math.ceil(HOLD_SECONDS / STEP));
  assert.equal(game.winner, 0);
  game.restart();
  assert.equal(game.winner, null);
  assert.equal(game.round, 2);
  assert.deepEqual(game.points.map(p => p.home), game.points.map(p => p.owner));
});

test('both offline teams move, fight and earn points under bot control', () => {
  const game = new Match();
  assert.equal(game.players.length, 16);
  const start = game.players.map(p => p.body.position.clone());
  for (let i = 0; i < 2850; i++) game.step();
  for (const team of [0, 1]) {
    assert.ok(game.players.some((p, i) => p.team === team && p.body.position.distanceTo(start[i]) > 70));
    assert.ok(game.players.some(p => p.team === team && p.kills > 0));
  }
});
