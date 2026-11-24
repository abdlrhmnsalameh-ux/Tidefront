import assert from 'node:assert/strict';
import test from 'node:test';
import { chartPoint } from '../client/chart.js';
import { CommandPanel } from '../client/command-panel.js';
import { unpack } from '../client/snapshot.js';
import { Match } from '../shared/match.js';

const allies = (game, team = 0) => game.command.snapshot().units[team];

test('a commander moves both rifle squads, both tanks, and the launcher while personally fighting', () => {
  const game = new Match();
  const commander = game.join('You', 0);
  game.command.deploy(0);
  game.players.filter(p => p.team === 1).forEach(p => { p.human = true; });
  const initial = allies(game);
  assert.equal(initial.length, 5);
  assert.ok(initial.every(u => u.status === 'Holding' && u.available));
  const targets = initial.map(({ id, type, x, z }) => ({ kind: 'move', unit: id, x: type === 'infantry' ? 75 : x + 42, z }));
  for (const order of targets) assert.match(game.command.send(commander, order).message, /ordered to move/);
  const avatarStart = commander.body.position.x;
  for (let i = 0; i < 850; i++) {
    if (i < 35) game.input(commander, { seq: i, yaw: Math.PI / 2, w: .5, fire: true });
    game.step();
    if (i === 34) {
      assert.ok(commander.body.position.x > avatarStart + 3);
      assert.ok(commander.ammo.rifle < 30);
    }
  }
  for (const unit of allies(game)) {
    const target = targets.find(o => o.unit === unit.id);
    assert.equal(unit.status, 'In position', unit.label);
    assert.ok(Math.hypot(unit.x - target.x, unit.z - target.z) < 10, unit.label);
  }
  assert.ok(allies(game).filter(u => u.type === 'infantry').every(u => u.x > 60));
});

test('an available soldier boards an empty launcher, holds, and returns to autonomous control on release', () => {
  const game = new Match();
  const commander = game.join('You', 0);
  const launcher = allies(game).find(u => u.type === 'launcher');
  const order = { kind: 'move', unit: launcher.id, x: -234, z: 16 };
  assert.match(game.command.send(commander, order).message, /ordered to move/);
  assert.equal(allies(game).find(u => u.id === launcher.id).status, 'Crew boarding');
  for (let i = 0; i < 750; i++) game.step();
  const unit = allies(game).find(u => u.id === launcher.id);
  assert.equal(unit.status, 'In position');
  assert.match(game.command.send(commander, { kind: 'hold', unit: launcher.id }).message, /hold position/);
  assert.equal(allies(game).find(u => u.id === launcher.id).status, 'Holding');
  for (let i = 0; i < 95; i++) game.step();
  assert.ok(Math.abs(allies(game).find(u => u.id === launcher.id).x - unit.x) < 2);
  assert.match(game.command.send(commander, { kind: 'release', unit: launcher.id }).message, /autonomous/);
  assert.equal(allies(game).find(u => u.id === launcher.id).order, undefined);
});

test('orders are scoped to the leader, reject water, and never control players', () => {
  const game = new Match();
  const leader = game.join('Leader', 0);
  const teammate = game.join('Teammate', 0);
  const target = allies(game).find(unit => unit.type === 'tank');
  const wrong = allies(game, 1).find(unit => unit.type === 'tank');
  const order = { unit: target.id, x: -233, z: 3, kind: 'move' };
  assert.match(game.command.send(teammate, order).error, /team commander/);
  assert.match(game.command.send(leader, { ...order, unit: wrong.id }).error, /outside your command/);
  assert.match(game.command.send(leader, { ...order, x: 0 }).error, /clear land/);
  assert.match(game.command.send(leader, { ...order, x: Infinity }).error, /clear land/);
  const tank = game.vehicles.find(v => v.id === target.id);
  game.enter(teammate, tank);
  assert.match(game.command.send(leader, order).error, /unavailable/);
  game.leave(leader);
  assert.equal(game.command.snapshot().leaders[0], teammate.id);
  game.exit(teammate, true);
  assert.match(game.command.send(teammate, order).message, /ordered to move/);
});

test('mixed units can merge, take separate destinations under one order, and split with orders intact', () => {
  const game = new Match();
  const commander = game.join('Leader', 0);
  const teammate = game.join('Teammate', 0);
  game.command.deploy(0);
  const before = allies(game);
  const infantry = before.find(unit => unit.type === 'infantry');
  const tank = before.find(unit => unit.type === 'tank');
  const launcher = before.find(unit => unit.type === 'launcher');
  const merge = { kind: 'merge', units: [infantry.id, tank.id] };
  assert.match(game.command.send(teammate, merge).error, /commander/);
  assert.match(game.command.send(commander, { ...merge, units: [tank.id, tank.id] }).error, /different/);
  const enemy = allies(game, 1).find(unit => unit.type === 'tank');
  assert.match(game.command.send(commander, { ...merge, units: [tank.id, enemy.id] }).error, /under your command/);
  const group = game.command.send(commander, merge).selected;
  const merged = game.command.send(commander, { kind: 'merge', units: [group, launcher.id] }).selected;
  assert.equal(allies(game).length, before.length - 2);
  assert.equal(game.players.length, 16);
  assert.match(allies(game).find(unit => unit.id === merged).status, /3 of 3/);
  const move = { kind: 'move', unit: merged, x: -238, z: 34 };
  assert.match(game.command.send(commander, move).message, /3 of 3 units moving/);
  const orders = [infantry.id, tank.id, launcher.id].map(id => game.command.orders[0].get(id));
  assert.equal(new Set(orders.map(order => [order.x, order.z].join('/'))).size, 3);
  assert.ok(orders.every(order => Math.hypot(order.x - move.x, order.z - move.z) < 30));
  const start = game.vehicles.find(v => v.id === tank.id).body.position.x;
  for (let i = 0; i < 240; i++) game.step();
  assert.ok(game.vehicles.find(v => v.id === tank.id).body.position.x > start + 15);
  assert.match(game.command.send(commander, { kind: 'split', unit: merged }).message, /kept their orders/);
  assert.equal(allies(game).length, before.length);
  for (const order of orders) assert.equal(game.command.orders[0].get(order.unit), order);
});

function mockDocument() {
  const context = new Proxy({
    createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
  }, { get: (target, key) => target[key] ?? (() => {}) });
  class Element {
    constructor() {
      this.children = [];
      this.dataset = {};
      this.style = { setProperty() {} };
      this.attributes = new Map();
      this.events = new Map();
      this.width = 930;
      this.height = 570;
    }
    append(...nodes) { this.children.push(...nodes); }
    remove() {}
    setAttribute(name, value) { this.attributes.set(name, value); }
    getContext() { return context; }
    addEventListener(type, fn) { this.events.set(type, fn); }
    getBoundingClientRect() { return { width: 465, height: 285, left: 30, top: 20 }; }
  }
  const elements = new Map();
  return {
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, new Element());
      return elements.get(id);
    },
    createElement: () => new Element(),
  };
}

test('a click on the scaled map dispatches the selected unit to the matching game position', async t => {
  const documentBefore = globalThis.document;
  globalThis.document = mockDocument();
  t.after(() => { globalThis.document = documentBefore; });
  const game = new Match();
  const commander = game.join('You', 0);
  game.command.deploy(0);
  const panel = new CommandPanel(raw => game.command.send(commander, raw));
  function draw() {
    const state = unpack(game.snapshot());
    const me = state.players.find(p => p.id === commander.id);
    panel.update(state, me, me);
  }
  draw();
  assert.match(panel.hint.textContent, /Select a unit/);
  const tank = allies(game).find(u => u.type === 'tank');
  panel.rows.get(tank.id).button.events.get('click')();
  assert.equal(panel.rows.get(tank.id).button.attributes.get('aria-pressed'), 'true');
  const [x, y] = chartPoint(panel.canvas, -225, 31);
  await panel.click({ clientX: 30 + x / 2, clientY: 20 + y / 2 });
  assert.match(panel.notice.textContent, /ordered to move/);
  draw();
  assert.deepEqual(panel.chosen().order, { kind: 'move', x: -225, z: 31 });
  assert.equal(panel.chosen().status, 'En route');
  await panel.order('hold');
  draw();
  assert.equal(panel.chosen().status, 'Holding');
  assert.equal(panel.hold.disabled, false);
  for (let i = 0; i < 5; i++) game.support.award(0, 'down');
  draw();
  panel.buy('strike');
  assert.match(panel.hint.textContent, /strike location/);
  const [strikeX, strikeY] = chartPoint(panel.canvas, 70, -326);
  await panel.click({ clientX: 30 + strikeX / 2, clientY: 20 + strikeY / 2 });
  assert.match(panel.notice.textContent, /squadron inbound/i);
  assert.equal(game.support.credits[0], 50);
  assert.ok(Math.abs(game.support.strikes[0].x - 70) < .001);
  draw();
  panel.selectGroup.events.get('click')();
  const squad = allies(game).find(unit => unit.type === 'infantry');
  panel.rows.get(tank.id).button.events.get('click')();
  panel.rows.get(squad.id).button.events.get('click')();
  assert.equal(panel.mergeGroup.disabled, false);
  await panel.mergeGroup.events.get('click')();
  draw();
  assert.equal(panel.chosen().type, 'group');
  assert.equal(panel.splitGroup.hidden, false);
  await panel.splitGroup.events.get('click')();
  draw();
  assert.ok(panel.rows.has(tank.id));
  assert.ok(panel.rows.has(squad.id));
  const driver = game.join('Driver', 0);
  const launcher = game.vehicles.find(v => v.type === 'ballistic' && v.team === 0);
  game.enter(driver, launcher);
  const launcherPanel = new CommandPanel(raw => game.command.send(driver, raw));
  const driverView = unpack(game.snapshot());
  launcherPanel.update(driverView, driverView.players.find(p => p.id === driver.id),
    driverView.vehicles.find(v => v.id === launcher.id));
  assert.equal(launcherPanel.allowed, false);
  assert.equal(launcherPanel.markBallistic.hidden, false);
  launcherPanel.markBallistic.events.get('click')();
  const [aimX, aimY] = chartPoint(launcherPanel.canvas, -188, 77);
  await launcherPanel.click({ clientX: 30 + aimX / 2, clientY: 20 + aimY / 2 });
  assert.match(launcherPanel.notice.textContent, /Target marked/);
  assert.ok(Math.abs(launcher.target.x + 188) < .001);
});
