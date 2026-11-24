import assert from 'node:assert/strict';
import test from 'node:test';
import { Match } from '../shared/match.js';
import { heightAt } from '../shared/map.js';
import { PURCHASES, REWARDS } from '../shared/support.js';

function place(player, x, z) {
  player.body.position.set(x, heightAt(x, z) + player.halfY, z);
  player.body.velocity.setZero();
  player.body.aabbNeedsUpdate = true;
}

test('kills and captures fund deployable fireteams and armor without using human seats', () => {
  const game = new Match();
  const commander = game.join('Commander', 0);
  const defenders = game.players.filter(p => p.team === 1);
  for (const p of defenders) place(p, 390, p.index * 4);
  for (const p of defenders.slice(0, 4)) {
    p.graceUntil = 0;
    game.damage(p, 200, commander);
  }
  assert.equal(game.support.credits[0], 4 * REWARDS.down);
  const point = game.points[4];
  place(commander, point.x, point.z);
  for (let i = 0; i < 212; i++) game.capture(1 / 30);
  assert.equal(point.owner, 0);
  const earned = 4 * REWARDS.down + REWARDS.capture;
  assert.equal(game.support.credits[0], earned);
  assert.match(game.command.send(commander, { kind: 'support', support: 'rifles' }).message, /arrived/);
  assert.match(game.command.send(commander, { kind: 'support', support: 'tank' }).message, /arrived/);
  const team = game.command.snapshot().units[0];
  const fireteam = team.find(u => u.label.startsWith('Rifle Fireteam'));
  assert.equal(fireteam.status, 'Holding');
  assert.match(game.command.send(commander, { kind: 'move', unit: fireteam.id, x: -270, z: 80 }).message, /move/);
  assert.equal(team.filter(u => u.type === 'tank').length, 3);
  assert.equal(game.support.credits[0], earned - PURCHASES.tank.cost - PURCHASES.rifles.cost);
  assert.match(game.command.send(commander, { kind: 'support', support: 'launcher' }).error, /points/);
  assert.equal(game.players.length, 19);
  for (let i = 0; i < 7; i++) assert.ok(game.join('Player', 0).index < 8);
  assert.equal(game.players.filter(p => p.team === 0 && p.human).length, 8);
  game.restart();
  assert.equal(game.players.length, 16);
  assert.equal(game.support.credits[0], 0);
});

test('all four reserve vehicles stay empty for the player to board', () => {
  const game = new Match();
  const p = game.join('Commander', 0);
  game.command.deploy(0);
  for (let i = 0; i < 165; i++) game.step();
  const garage = game.vehicles.filter(vehicle => vehicle.spawn.reserve && vehicle.team === 0);
  assert.deepEqual(garage.map(v => v.type), ['recon', 'tank', 'launcher', 'ballistic']);
  for (let i = 0; i < garage.length; i++) {
    const vehicle = garage[i];
    assert.equal(vehicle.driver, null);
    const at = vehicle.body.position;
    place(p, at.x - 3.4, at.z);
    game.input(p, { seq: i, action: 1 });
    game.step();
    assert.equal(p.vehicle, vehicle);
    game.exit(p);
  }
});

test('the team can buy beyond the old caps and paid reinforcements deploy as pads clear', () => {
  const game = new Match();
  const commander = game.join('Commander', 0);
  const purchases = ['tank', 'tank', 'tank', 'launcher', 'launcher', 'launcher', 'rifles', 'rifles', 'rifles', 'rifles'];
  const budget = purchases.reduce((sum, type) => sum + PURCHASES[type].cost, 0);
  game.support.credits[0] = budget;
  for (const type of purchases) {
    const result = game.command.send(commander, { kind: 'support', support: type });
    assert.match(result.message, /arrived|queued/);
  }
  assert.equal(game.support.credits[0], 0);
  assert.deepEqual(game.support.hired[0], { tank: 3, launcher: 3, rifles: 4 });
  assert.ok(game.snapshot().support.queued[0] > 0);
  const extras = game.vehicles.filter(v => v.spawn.reinforcement);
  for (const [i, vehicle] of extras.entries()) {
    place(vehicle, -255, 160 + i * 10);
    vehicle.speed = 0;
  }
  for (const [i, entity] of game.players.filter(p => p.index >= 8 && !p.vehicle).entries()) place(entity, -239, 160 + i * 2);
  for (let i = 0; i < 210; i++) game.step();
  assert.equal(game.snapshot().support.queued[0], 0);
  assert.equal(game.command.snapshot().units[0].filter(unit => unit.label.startsWith('Rifle Fireteam')).length, 4);
  assert.equal(game.players.filter(p => p.team === 0 && p.index >= 8).length, 14);
});

test('Kestrel support dispatches three aircraft, fires projectiles and clears the squadron', () => {
  const game = new Match();
  const p = game.join('Commander', 0);
  const target = game.join('Target', 1);
  for (const bot of game.players) bot.human = true;
  const x = 30;
  const z = -326;
  place(target, x, z);
  target.graceUntil = 0;
  const order = { kind: 'support', support: 'strike', x, z };
  assert.match(game.command.send(p, order).error, /points/);
  for (let i = 0; i < 5; i++) game.support.award(0, 'down');
  assert.match(game.command.send(p, order).message, /inbound/);
  assert.equal(game.support.credits[0], 50);
  assert.equal(game.snapshot().support.flights.length, 3);
  let launches = 0;
  let hit = false;
  for (let i = 0; i < 248; i++) {
    game.step();
    launches += game.projectiles.filter(shot => shot.kind === 'missile' && shot.age === 0).length;
    hit ||= target.hp < 100;
  }
  assert.equal(launches, 3);
  assert.equal(hit, true);
  assert.equal(game.snapshot().support.flights.length, 0);
});
