import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { Server } from 'socket.io';
import { Match, STEP } from '../shared/match.js';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

const roomCode = value => typeof value === 'string' && /^[A-Z0-9-]{2,16}$/i.test(value)
  ? value.toUpperCase() : 'STRAIT';
const playerName = value => typeof value === 'string'
  ? value.normalize('NFKC').replace(/[^\p{L}\p{N} -]/gu, '').trim().slice(0, 20) : '';

export function createGameServer({ publicRoot = DIST, origins = [] } = {}) {
  const rooms = new Map();
  const root = resolve(publicRoot);
  const server = createServer(async (request, response) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    } catch {
      response.writeHead(400).end('Bad request');
      return;
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405).end('Method not allowed');
      return;
    }
    if (pathname === '/api/status') {
      const json = JSON.stringify({ game: 'tidefront', online: true, rooms: rooms.size });
      response.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }).end(request.method === 'HEAD' ? '' : json);
      return;
    }
    const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + sep) || pathname.includes('\0') || pathname.includes('\\')) {
      response.writeHead(404).end('Not found');
      return;
    }
    try {
      const info = await stat(file);
      if (!info.isFile()) throw new Error('Not a file');
      response.writeHead(200, {
        'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
        'Content-Length': info.size,
        'Cache-Control': pathname.endsWith('.html') || pathname === '/' ? 'no-cache' : 'public, max-age=600',
        'X-Content-Type-Options': 'nosniff',
      });
      if (request.method === 'HEAD') response.end();
      else createReadStream(file).on('error', () => response.destroy()).pipe(response);
    } catch {
      response.writeHead(404).end(pathname === '/' ? 'Run npm run build to create the browser client.' : 'Not found');
    }
  });
  const io = new Server(server, {
    maxHttpBufferSize: 8192,
    cors: origins.length ? { origin: origins, methods: ['GET', 'POST'] } : undefined,
    serveClient: false,
  });
  io.on('connection', socket => {
    let player;
    let room;
    let trafficCount = 0;
    let windowStarted = performance.now();
    socket.on('join', (raw, ack) => {
      if (typeof ack !== 'function') return;
      if (player) {
        ack({ id: player.id, room: room.code, state: room.game.snapshot() });
        return;
      }
      const code = roomCode(raw?.room);
      room = rooms.get(code);
      if (!room && rooms.size >= 12) {
        ack({ error: 'The server has reached its room limit.' });
        return;
      }
      if (!room) {
        room = { code, game: new Match(), people: new Set(), emptySince: 0 };
        rooms.set(code, room);
      }
      player = room.game.join(playerName(raw?.name), raw?.team);
      if (!player) {
        ack({ error: 'This room is full. Try another room code.' });
        return;
      }
      room.people.add(socket.id);
      socket.join(code);
      ack({ id: player.id, room: code, state: room.game.snapshot() });
    });
    socket.on('input', raw => {
      if (player && actionAllowed()) room.game.input(player, raw);
    });
    socket.on('order', (raw, ack) => {
      if (!player || typeof ack !== 'function') return;
      ack(actionAllowed() ? room.game.command.send(player, raw) : { error: 'Orders are arriving too quickly.' });
    });
    function actionAllowed() {
      const now = performance.now();
      if (now - windowStarted > 1000) {
        windowStarted = now;
        trafficCount = 0;
      }
      return ++trafficCount <= 65;
    }
    socket.on('disconnect', () => {
      if (!player) return;
      room.game.leave(player);
      room.people.delete(socket.id);
      if (!room.people.size) room.emptySince = performance.now();
    });
  });
  let last = performance.now();
  let accumulator = 0;
  let ticks = 0;
  const loop = setInterval(() => {
    const now = performance.now();
    accumulator += Math.min(.2, (now - last) / 1000);
    last = now;
    while (accumulator >= STEP) {
      accumulator -= STEP;
      ticks++;
      for (const room of rooms.values()) {
        if (!room.people.size) {
          if (now - room.emptySince > 30000) rooms.delete(room.code);
          continue;
        }
        const game = room.game;
        game.step();
        if (game.winner !== null && game.time - game.finishedAt > 13) game.restart();
        if (ticks % 2 === 0) io.to(room.code).volatile.emit('state', game.snapshot());
      }
    }
  }, 12);
  loop.unref();
  return {
    server, io, rooms,
    close() {
      clearInterval(loop);
      return new Promise(resolveClose => io.close(resolveClose));
    },
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? '0.0.0.0';
  const origins = (process.env.CORS_ORIGINS ?? '').split(',').map(s => s.trim()).filter(Boolean);
  const game = createGameServer({ origins });
  game.server.listen(port, host, () => console.log(`Tidefront is ready on http://localhost:${port}`));
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => game.close().then(() => process.exit(0)));
}
