import test from 'node:test';
import assert from 'node:assert/strict';
import { Vec3 } from 'cannon-es';
import { Match } from '../shared/match.js';
import { advanceShots, launchProjectile } from '../shared/combat.js';
import { ARMS, STEP } from '../shared/rules.js';
import { heightAt } from '../shared/map.js';
import { turnBody } from '../shared/vehicles.js';

function park(entity, x, z, yaw = 0) {
  entity.body.position.set(x, heightAt(x, z) + entity.halfY, z);
  entity.body.velocity.setZero();
  entity.body.aabbNeedsUpdate = true;
  entity.yaw = entity.turret = yaw;
  turnBody(entity);
}

test('bullet drop follows elapsed game time, while a rocket accelerates through its boost phase', () => {
  const game = new Match();
  const shooter = game.join('Shooter', 0);
  const start = new Vec3(-65, 65, 205);
  launchProjectile(game, 'rifle', shooter, shooter, start.clone(), new Vec3(74, 0, 0));
  const duration = .4;
  for (let i = 0; i < 12; i++) advanceShots(game, STEP);
  const bullet = game.projectiles[0];
  assert.ok(Math.abs(bullet.position.y - (start.y - ARMS.rifle.fall * duration ** 2 / 2)) < .0001);
  assert.ok(Math.abs(bullet.velocity.y + ARMS.rifle.fall * duration) < .0001);
  assert.ok(Math.abs(bullet.position.x - (start.x + 74 * duration)) < .0001);
  launchProjectile(game, 'rocket', shooter, shooter, start.clone(), new Vec3(50, 0, 0));
  for (let i = 0; i < 6; i++) advanceShots(game, STEP);
  const rocket = game.projectiles.find(shot => shot.kind === 'rocket');
  assert.ok(rocket.velocity.x > 58);
  assert.ok(rocket.position.y < start.y);
});

test('a ridge blocks a high-speed projectile before it can hit an armored vehicle behind it', () => {
  const game = new Match();
  const shooter = game.join('Shooter', 0);
  const target = game.vehicles.find(vehicle => vehicle.team === 1 && vehicle.type === 'recon');
  const y = 26.88;
  park(target, 444, -186);
  target.body.position.y = y + .30;
  game.world.step(STEP);
  launchProjectile(game, 'rifle', shooter, shooter, new Vec3(414, y, -186), new Vec3(960, 0, 0));
  advanceShots(game, STEP);
  assert.equal(target.hp, target.spec.hp);
  assert.equal(game.projectiles.length, 0);
  const impact = game.events.find(event => event.type === 'impact');
  assert.ok(impact.x > 414 && impact.x < 429);
});

test('a tank takes less cannon damage from the front than from the rear', () => {
  const game = new Match();
  const shooter = game.join('Shooter', 0);
  const tank = game.vehicles.find(vehicle => vehicle.team === 1 && vehicle.type === 'tank');
  park(tank, -253, -46);
  game.world.step(STEP);
  const { x, y, z } = tank.body.position;
  function fireFrom(side) {
    tank.hp = tank.spec.hp;
    launchProjectile(game, 'cannon', shooter, shooter, new Vec3(x, y, z + side * 22), new Vec3(0, 0, -side * 156));
    for (let i = 0; i < 8; i++) advanceShots(game, STEP);
    return tank.spec.hp - tank.hp;
  }
  const front = fireFrom(-1);
  const rear = fireFrom(1);
  assert.ok(front > 0 && rear > front);
  assert.equal(game.events.filter(event => event.type === 'blast').length, 2);
});

test('a Meridian driver can mark, launch, and hit a stationary game target with a high arc', () => {
  const game = new Match();
  const commander = game.join('Commander', 0);
  const driver = game.join('Meridian driver', 0);
  for (const actor of game.players) actor.human = true;
  const launcher = game.vehicles.find(v => v.type === 'ballistic' && v.team === 0);
  const target = game.vehicles.find(v => v.type === 'tank' && v.team === 1);
  const x = -205;
  const z = 80;
  park(target, x, z);
  assert.match(game.command.send(commander, { kind: 'ballistic-target', x, z }).error, /Board/);
  game.enter(driver, launcher);
  assert.match(game.command.send(driver, { kind: 'ballistic-target', x: 999, z }).error, /inside/);
  assert.match(game.command.send(driver, { kind: 'ballistic-target', x, z }).message, /marked/);
  for (let i = 0; i < 26; i++) {
    game.input(driver, { seq: i, fire: true, w: 1 });
    game.step();
  }
  assert.equal(game.events.filter(event => event.kind === 'ballistic').length, 0);
  let launched = 0;
  let highest = -Infinity;
  let descending = false;
  for (let i = 26; i < 294; i++) {
    game.input(driver, { seq: i, fire: true });
    game.step();
    for (const projectile of game.projectiles.filter(shot => shot.kind === 'ballistic')) {
      if (projectile.age === STEP) launched++;
      highest = Math.max(highest, projectile.position.y);
      descending ||= projectile.velocity.y < -5;
    }
  }
  assert.equal(launched, 1);
  assert.ok(highest > 48);
  assert.ok(descending);
  assert.ok(target.hp < target.spec.hp);
  assert.ok(launcher.cooldowns.ballistic > game.time);
});

test('the Lancer firing controls launch a rocket that flies and damages an opposing tank', () => {
  const game = new Match();
  const driver = game.join('Driver', 0);
  for (const actor of game.players) actor.human = true;
  const launcher = game.vehicles.find(v => v.type === 'launcher' && v.team === 0);
  const tank = game.vehicles.find(v => v.type === 'tank' && v.team === 1);
  park(launcher, -253, 40);
  park(tank, -253, -17);
  game.enter(driver, launcher);
  let followedRocket = false;
  for (let i = 0; i < 41; i++) {
    game.input(driver, { seq: i, pitch: -.032, yaw: 0, fire: i > 5 });
    game.step();
    followedRocket ||= game.projectiles.some(shot => shot.kind === 'salvo' && shot.position.z < 20);
  }
  assert.equal(followedRocket, true);
  assert.ok(tank.hp < tank.spec.hp);
  assert.ok(game.events.some(event => event.type === 'blast' && Math.abs(event.z + 17) < 7));
});
