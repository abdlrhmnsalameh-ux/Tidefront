import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';
import { io } from 'socket.io-client';
import { createGameServer } from '../server/index.js';

test('Node serves the game and Socket.IO runs a 16-client match with a live authoritative simulation', async t => {
  const host = createGameServer();
  const clients = [];
  t.after(async () => {
    for (const socket of clients) socket.disconnect();
    await host.close();
  });
  host.server.listen(0, '127.0.0.1');
  await once(host.server, 'listening');
  const url = 'http://127.0.0.1:' + host.server.address().port;
  const landing = await fetch(url);
  assert.ok(landing.ok);
  assert.match(await landing.text(), /<title>Tidefront<\/title>/);
  const api = await (await fetch(url + '/api/status')).json();
  assert.equal(api.online, true);
  async function join(i) {
    const socket = io(url, { transports: ['websocket'], reconnection: false, timeout: 2500, autoConnect: false, forceNew: true });
    clients.push(socket);
    const connected = once(socket, 'connect');
    socket.connect();
    await connected;
    return socket.timeout(3000).emitWithAck('join', { room: 'TEST-STRAIT', name: 'Player ' + i });
  }
  const first = await join(0);
  assert.equal(first.state.players.filter(p => p[11]).length, 1);
  assert.equal(first.state.players.length, 16);
  const second = await join(1);
  const third = await join(2);
  assert.equal(first.state.command.leaders[0], first.id);
  const tank = first.state.command.units[0].find(unit => unit.type === 'tank');
  const order = { kind: 'move', unit: tank.id, x: -251, z: 4 };
  const reject = await clients[2].timeout(3000).emitWithAck('order', order);
  assert.match(reject.error, /team commander/);
  const accepted = await clients[0].timeout(3000).emitWithAck('order', order);
  assert.match(accepted.message, /ordered to move/);
  const issued = (await once(clients[2], 'state'))[0];
  assert.deepEqual(issued.command.units[0].find(unit => unit.id === tank.id).order, { kind: 'move', x: -251, z: 4 });
  const online = host.rooms.get('TEST-STRAIT').game;
  online.support.award(0, 'capture');
  const request = { kind: 'support', support: 'rifles' };
  assert.match((await clients[2].timeout(3000).emitWithAck('order', request)).error, /team commander/);
  assert.match((await clients[0].timeout(3000).emitWithAck('order', request)).message, /arrived/);
  const reinforced = (await once(clients[2], 'state'))[0];
  assert.equal(reinforced.support.credits[0], 50);
  const fireteam = reinforced.command.units[0].find(unit => unit.label === 'Rifle Fireteam 1');
  assert.ok(fireteam);
  const merge = { kind: 'merge', units: [tank.id, fireteam.id] };
  assert.match((await clients[2].timeout(3000).emitWithAck('order', merge)).error, /team commander/);
  const merged = await clients[0].timeout(3000).emitWithAck('order', merge);
  const grouped = (await once(clients[2], 'state'))[0];
  assert.equal(grouped.command.units[0].find(unit => unit.id === merged.selected).type, 'group');
  assert.match((await clients[0].timeout(3000).emitWithAck('order', { kind: 'split', unit: merged.selected })).message, /Group split/);
  const active = [second, third, ...await Promise.all(Array.from({ length: 13 }, (_, i) => join(i + 3)))];
  assert.equal(new Set([first, ...active].map(r => r.id)).size, 16);
  assert.match((await join(16)).error, /full/);
  const frame = (await once(clients[0], 'state'))[0];
  assert.equal(frame.players.filter(p => p[11] && p[1] === 0).length, 8);
  assert.equal(frame.players.filter(p => p[11] && p[1] === 1).length, 8);

  const old = frame.players.find(p => p[0] === first.id);
  let movingFrame = frame;
  for (let seq = 1; seq <= 12; seq++) {
    clients[0].emit('input', { seq, w: 1, yaw: Math.PI / 2, fire: true });
    movingFrame = (await once(clients[1], 'state'))[0];
  }
  const moved = movingFrame.players.find(p => p[0] === first.id);
  assert.ok(moved[3] - old[3] > 3);
  assert.ok(moved[16] < old[16]);
  assert.ok(movingFrame.events.some(event => event.type === 'fire' && event.shooter === first.id));
  assert.ok(movingFrame.time > frame.time);
  clients[0].disconnect();
  await new Promise(resolve => setTimeout(resolve, 120));
  const replacement = await join(17);
  assert.equal(replacement.id, first.id);
  assert.equal(replacement.state.command.leaders[0], third.id);
  assert.equal(replacement.state.players.filter(p => p[11]).length, 16);
});
