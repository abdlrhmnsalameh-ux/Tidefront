import { io } from 'socket.io-client';
import { Match, STEP } from '../shared/match.js';
import { ARMS, HOLD_SECONDS, VEHICLES } from '../shared/rules.js';
import { heightAt, POINTS, TEAMS } from '../shared/map.js';
import { GameAudio } from './effects.js';
import { Controls } from './input.js';
import { drawChart } from './chart.js';
import { CommandPanel } from './command-panel.js';
import { unpack } from './snapshot.js';
import { View } from './view.js';

const $ = id => document.getElementById(id);
const canvas = $('field');
const audio = new GameAudio();
const panels = ['manual', 'pause-panel', 'tactical', 'roster', 'result'];
const controls = new Controls(canvas, command);
const commandPanel = new CommandPanel(sendOrder);
const flags = POINTS.map(point => {
  const flag = document.createElement('div');
  flag.className = 'flag';
  flag.textContent = point.id;
  flag.title = point.name;
  $('flag-status').append(flag);
  return flag;
});

let view;
let game;
let localPlayer;
let client;
let state;
let myId;
let room;
let modal;
let mode;
let leadFromMap = false;
let pending = false;
let gotStateAt = 0;
let hudAt = 0;
let seenEvent = 0;
let round = 0;
let ready = false;
let frozen = false;
let health = 100;
let lastNotices = [];
let hurtTimeout;

function prepareView() {
  if (view) return true;
  try {
    view = new View(canvas);
    return true;
  } catch (error) {
    console.error(error);
    $('launch-error').textContent = 'Tidefront requires a browser with WebGL 2 and graphics acceleration.';
    $('launch-error').hidden = false;
    return false;
  }
}

function activate(nextMode, id, initial, lead = false) {
  mode = nextMode;
  leadFromMap = lead;
  commandPanel.reset();
  myId = id;
  seenEvent = initial.events.at(-1)?.id ?? 0;
  round = initial.round;
  view.snap = true;
  view.wide = false;
  lastNotices = [];
  ready = true;
  frozen = false;
  health = 100;
  receive(initial);
  const me = state.players.find(player => player.id === myId);
  controls.yaw = me.yaw;
  controls.pitch = 0;
  controls.slot = 1;
  controls.sequence = 0;
  $('mode-label').textContent = mode === 'solo' ? (lead ? 'Solo command' : 'Solo conquest') : `Online · ${room}`;
  $('lobby').hidden = true;
  $('hud').hidden = false;
  $('world-markers').hidden = false;
  open(lead ? 'tactical' : null);
  if (mode === 'solo' && !lead && !controls.touch) controls.lock();
}

function startSolo(lead = false) {
  if (pending || !prepareView()) return;
  audio.unlock();
  game = new Match(Math.floor(Math.random() * 1e9));
  localPlayer = game.join('You', 0);
  if (lead) game.command.deploy(localPlayer.team);
  activate('solo', localPlayer.id, game.snapshot(), lead);
}

async function sendOrder(order) {
  if (!ready) return { error: 'Start a match to give orders.' };
  if (mode === 'solo') {
    const result = game.command.send(localPlayer, order);
    receive(game.snapshot());
    return result;
  }
  if (!client?.connected) return { error: 'The match server is disconnected.' };
  return new Promise(resolve => {
    client.timeout(3800).emit('order', order, (error, result) => {
      resolve(error || !result ? { error: 'The server did not confirm this order.' } : result);
    });
  });
}

function connect(event) {
  event.preventDefault();
  if (pending) return;
  if (!prepareView()) return;
  audio.unlock();
  const raw = $('host').value.trim();
  let endpoint;
  try {
    const url = raw ? new URL(raw) : new URL(location.origin);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Invalid server URL');
    endpoint = url.origin;
  } catch {
    $('network-note').textContent = 'Enter the full HTTP or HTTPS address of a Tidefront server.';
    return;
  }
  if (location.protocol === 'https:' && endpoint.startsWith('http:')) {
    $('network-note').textContent = 'Open the game from your Node server or enter its HTTPS address.';
    return;
  }
  pending = true;
  $('connect').disabled = true;
  $('network-note').textContent = 'Connecting to the match server…';
  const payload = { name: $('callsign').value, room: $('code').value };
  const socket = client = io(endpoint, { timeout: 5000, reconnectionAttempts: 5, autoConnect: false });
  const giveUp = message => {
    socket.disconnect();
    if (client === socket) client = undefined;
    pending = false;
    $('connect').disabled = false;
    $('network-note').textContent = message;
  };
  socket.on('connect', () => {
    socket.timeout(4900).emit('join', payload, (error, result) => {
      if (client !== socket) return;
      if (error || !result?.state) {
        if (ready) { notify(result?.error ?? 'Could not rejoin the server.'); return; }
        giveUp(result?.error ?? 'A Tidefront server did not respond at that address.');
        return;
      }
      pending = false;
      $('connect').disabled = false;
      room = result.room;
      activate('online', result.id, result.state);
    });
  });
  socket.on('connect_error', () => {
    if (pending) giveUp('No Tidefront match server at this address. Start the Node server or enter a server address.');
  });
  socket.on('disconnect', () => {
    if (mode === 'online' && ready) notify('Connection lost. Trying to rejoin…', 9);
  });
  socket.io.on('reconnect_failed', () => {
    if (mode === 'online') {
      returnToLobby();
      $('network-note').textContent = 'The server stopped responding. Join again when it is available.';
    }
  });
  socket.on('state', snapshot => { if (ready && mode === 'online') receive(snapshot); });
  socket.connect();
}

function returnToLobby() {
  ready = false;
  mode = null;
  game = localPlayer = state = null;
  client?.disconnect();
  client = undefined;
  $('hud').hidden = $('world-markers').hidden = true;
  $('lobby').hidden = false;
  $('hurt').style.opacity = 0;
  open(null);
}

function open(name) {
  if (modal === 'tactical' && name !== 'tactical' && view) view.snap = true;
  modal = name;
  for (const id of panels) $(id).hidden = name !== id;
  controls.enable(Boolean(ready && !modal && !frozen && state?.winner === null));
  if (!name) return;
  if (name === 'tactical' || name === 'roster') paint(performance.now());
  const button = $(name).querySelector('button:not([hidden])');
  button?.focus({ preventScroll: true });
}

function notify(text, length = 3.8) {
  lastNotices.push({ text, until: performance.now() / 1000 + length });
  lastNotices = lastNotices.slice(-3);
}

function command(action) {
  if (action === 'escape') {
    if (modal === 'result') return;
    open(modal ? null : ready ? 'pause-panel' : null);
  } else if (action === 'camera' && ready) {
    view.wide = !view.wide;
    view.snap = true;
  } else if (action === 'special' && ready) {
    const { seat } = focused();
    if (seat?.type === 'transport') controls.action |= 2;
    else controls.slot = controls.slot === 1 ? 2 : 1;
  } else if (action === 'tactical') {
    if (!ready || modal === 'result') return;
    if (modal === 'tactical') {
      open(null);
      controls.lock();
    } else {
      open('tactical');
    }
  } else {
    open(action);
  }
}

function focused() {
  const me = state?.players.find(p => p.id === myId);
  return { me, seat: me?.vehicle ? state.vehicles.find(v => v.id === me.vehicle) : null };
}

function receive(raw) {
  state = unpack(raw);
  gotStateAt = performance.now();
  const { me, seat } = focused();
  if (!me) return;
  if (round !== state.round) {
    round = state.round;
    view.snap = true;
    controls.yaw = me.yaw;
    controls.pitch = 0;
    controls.slot = 1;
    lastNotices = [];
    commandPanel.reset();
    open(leadFromMap ? 'tactical' : null);
  }
  const newHealth = seat?.hp ?? me.hp;
  if (newHealth < health - 3 && ready && !state.events.some(ev => ev.type === 'dismount' && ev.who === myId)) {
    $('hurt').style.opacity = '.85';
    clearTimeout(hurtTimeout);
    hurtTimeout = setTimeout(() => { $('hurt').style.opacity = '0'; }, 125);
  }
  health = newHealth;
  if (me.respawn !== null && !frozen) {
    frozen = true;
    controls.enable(false);
  }
  if (me.respawn === null && frozen) {
    frozen = false;
    controls.enable(!modal && state.winner === null);
    view.snap = true;
    controls.yaw = me.yaw;
    controls.pitch = 0;
    controls.slot = 1;
  }
  for (const event of state.events) {
    if (event.id <= seenEvent) continue;
    seenEvent = event.id;
    view.effects.event(event);
    audio.sound(event, seat ?? me);
    if (event.type === 'fire' && event.shooter === myId) view.recoil = event.kind === 'cannon' ? .34 : event.kind === 'rocket' ? .21 : .12;
    if (event.type === 'support' && event.team === me.team) notify(event.label);
    if (event.type === 'notice' && event.who === myId) notify(event.text);
    if (event.type === 'captured') {
      const earned = event.team === me.team ? ' · +250 requisition' : '';
      notify(`${TEAMS[event.team].name} captured ${POINTS.find(p => p.id === event.point).name}${earned}`);
    }
    if (event.type === 'down' && event.byId === myId) notify(`Eliminated ${event.name} · +100 requisition`, 2.7);
    if (event.type === 'down' && event.who === myId) notify(`Downed by ${event.by}`);
    if (event.type === 'dismount' && event.who === myId) {
      controls.yaw = event.yaw;
      controls.pitch = 0;
      view.snap = true;
    }
    if (event.type === 'mount' && event.who === myId) {
      controls.yaw = event.yaw;
      controls.pitch = 0;
      view.snap = true;
    }
  }
  if (state.winner !== null && modal !== 'result') {
    $('winner').textContent = TEAMS[state.winner].name + ' wins';
    $('result-info').textContent = mode === 'solo' ? 'All enemy territory held.' : 'The next round begins shortly.';
    $('rematch').hidden = mode !== 'solo';
    open('result');
  }
}

function paint(now) {
  const { me, seat } = focused();
  if (!state || !me) return;
  for (const team of [0, 1]) {
    $(team === 0 ? 'score-aster' : 'score-veyra').textContent = state.points.filter(p => p[0] === team).length;
  }
  state.points.forEach(([team, , progress, contested], index) => {
    const flag = flags[index];
    flag.style.setProperty('--team', TEAMS[team].color);
    flag.classList.toggle('contested', contested);
    flag.classList.toggle('capturing', progress > 0);
    flag.style.setProperty('--capture', Math.round(progress * 100) + '%');
  });
  const hold = state.hold.findIndex(value => value > 0);
  $('hold-status').textContent = hold >= 0 ? `${TEAMS[hold].name} hold · ${Math.max(0, Math.ceil(HOLD_SECONDS - state.hold[hold]))}s to win` : '';
  const bearing = ((Math.round((seat?.type === 'jet' ? seat.yaw : controls.yaw) * 180 / Math.PI) % 360) + 360) % 360;
  $('compass').textContent = `·  ${['N','NE','E','SE','S','SW','W','NW'][Math.round(bearing / 45) % 8]}  ${String(bearing).padStart(3, '0')}°  ·`;
  const held = seat?.type === 'transport' ? state.vehicles.filter(v => v.cargo === seat.id).length : 0;
  const nearby = state.vehicles.find(unit => unit.id === me.nearby);
  const currentPoint = POINTS.findIndex(p => Math.hypot(p.x - me.x, p.z - me.z) < p.radius);
  let hint = '';
  if (me.respawn !== null) hint = `Respawn in ${Math.max(0, Math.ceil(me.respawn - state.time))}s`;
  else if (seat?.type === 'transport') hint = seat.berth ? 'Berthing assist' : seat.ramp ? 'G  Secure ramp' : 'G  Berth / ramp';
  else if (nearby) hint = `${controls.touch ? 'Use' : 'E'}  Board ${VEHICLES[nearby.type].name}`;
  else if (currentPoint >= 0 && state.points[currentPoint][3]) hint = POINTS[currentPoint].name + ' contested';
  else if (currentPoint >= 0 && state.points[currentPoint][1] === me.team) hint = 'Capturing ' + POINTS[currentPoint].name;
  $('use-hint').textContent = hint;
  $('reticle').hidden = me.respawn !== null;
  const arm = me.slot === 2 ? ARMS.rocket : ARMS.rifle;
  $('gear-type').textContent = seat ? TEAMS[me.team].name + ' · Vehicle' : me.swim ? 'Swimming' : TEAMS[me.team].name + ' · Infantry';
  $('gear').textContent = seat ? VEHICLES[seat.type].name : arm.name;
  $('ammo').textContent = seat?.type === 'ballistic' && seat.weaponReadyAt > state.time ? 'Reload ' + Math.ceil(seat.weaponReadyAt - state.time) + 's'
    : seat ? Math.round(Math.abs(seat.speed) * 3.6) + ' km/h'
    : me.reload > state.time ? 'Reloading' : `${me.slot === 2 ? me.rocket : me.rifle} / ${arm.capacity}`;
  const maximum = seat ? VEHICLES[seat.type].hp : 100;
  const percent = Math.round((seat?.hp ?? me.hp) / maximum * 100);
  $('hp-fill').style.width = percent + '%';
  $('hp-fill').style.background = percent > 35 ? '#a7cba7' : '#ea947a';
  $('gear-tip').textContent = seat?.type === 'ballistic'
    ? (seat.weaponReadyAt > state.time ? 'Reloading · ' + Math.ceil(seat.weaponReadyAt - state.time) + 's'
      : seat.target ? 'Target marked · Stop, align, then fire' : 'M  Open map to mark a target')
    : seat?.type === 'jet' ? (seat.airborne ? `${Math.round(seat.y - heightAt(seat.x, seat.z))} m above terrain · Q nose down` : 'W  Throttle · Space  Lift off')
    : seat?.type === 'transport' ? `${held} cargo on deck · ${percent}% hull`
      : seat ? `E  Dismount · ${percent}% integrity` : '1  AK-47 · 2  RPG · R  Reload';
  $('touch-up').textContent = seat?.type === 'jet' ? 'Nose up' : 'Jump';
  $('touch-up').hidden = Boolean(seat && seat.type !== 'jet');
  $('touch-down').hidden = seat?.type !== 'jet';
  $('touch-alt').hidden = !seat || !VEHICLES[seat.type].secondary;
  $('touch-special').textContent = seat?.type === 'transport' ? 'Ramp' : 'Swap';
  $('touch-special').hidden = Boolean(seat && seat.type !== 'transport');
  drawChart($('mini-chart'), state, seat ?? me);

  lastNotices = lastNotices.filter(item => item.until > now / 1000);
  const notices = lastNotices.map(item => {
    const written = document.createElement('div');
    written.className = 'notice';
    written.textContent = item.text;
    return written;
  });
  $('announcements').replaceChildren(...notices);
  if (modal === 'tactical') {
    commandPanel.update(state, me, seat ?? me);
  }
  if (modal === 'roster') {
    $('roster-body').replaceChildren(...TEAMS.map((team, i) => roster(team, state.players.filter(p => p.team === i))));
  }
}

function roster(team, members) {
  const table = document.createElement('table');
  table.className = 'roster-table';
  const caption = table.createCaption();
  caption.style.color = team.color;
  caption.textContent = team.name;
  const headings = table.createTHead().insertRow();
  for (const text of ['Operator', 'Downs', 'Deaths', 'Points']) {
    const cell = document.createElement('th');
    cell.scope = 'col';
    cell.textContent = text;
    headings.append(cell);
  }
  const body = table.createTBody();
  for (const player of members.sort((a, b) => b.score - a.score)) {
    const row = body.insertRow();
    if (player.id === myId) row.className = 'is-me';
    for (const value of [player.name + (player.human ? '' : ' · AI'), player.kills, player.deaths, player.score]) row.insertCell().textContent = value;
  }
  return table;
}

let last = performance.now();
let accumulated = 0;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(.10, Math.max(0, (now - last) / 1000));
  last = now;
  if (!ready) { accumulated = 0; return; }
  controls.tick(dt);
  if (mode === 'solo' && modal && modal !== 'tactical') accumulated = 0;
  else accumulated += dt;
  while (accumulated >= STEP) {
    accumulated -= STEP;
    const input = controls.packet();
    if (mode === 'solo') {
      game.input(localPlayer, input);
      game.step();
      receive(game.snapshot());
    } else if (client?.connected) client.emit('input', input);
  }
  if (!state) return;
  if (now - hudAt > 100) {
    paint(now);
    hudAt = now;
  }
  if (modal === 'tactical') {
    view.effects.update(dt, [], 0);
    return;
  }
  state.renderAge = (now - gotStateAt) / 1000;
  view.frame(state, focused().me, controls, dt, now / 1000);
}

$('lead').onclick = () => startSolo(true);
$('solo').onclick = () => startSolo();
$('online').onclick = async () => {
  $('launchers').hidden = true;
  $('online-form').hidden = false;
  if (location.protocol === 'file:') {
    $('network-note').textContent = 'Enter your Node server address, or open Tidefront from your Node server.';
    return;
  }
  try {
    const response = await fetch('./api/status', { cache: 'no-store' });
    const isServer = response.ok && (await response.json()).game === 'tidefront';
    $('network-note').textContent = isServer ? 'Use the same room code as your teammates.'
      : 'This browser build runs solo. For online play, enter your Node server’s HTTPS address.';
  } catch {
    $('network-note').textContent = 'Enter your Node server’s HTTPS address to join an online match.';
  }
};
$('online-form').onsubmit = connect;
$('go-back').onclick = () => {
  if (pending) return;
  $('online-form').hidden = true;
  $('launchers').hidden = false;
};
$('help-lobby').onclick = () => open('manual');
$('help-game').onclick = () => open('manual');
$('pause').onclick = () => open('pause-panel');
$('map-button').onclick = () => command('tactical');
$('return-fight').onclick = () => command('tactical');
for (const button of document.querySelectorAll('[data-close]')) button.onclick = () => open(null);
$('resume').onclick = () => { open(null); controls.lock(); };
$('sound').onclick = () => {
  audio.enabled = !audio.enabled;
  $('sound').textContent = audio.enabled ? 'Sound on' : 'Sound off';
};
$('leave').onclick = returnToLobby;
$('exit-result').onclick = returnToLobby;
$('rematch').onclick = () => {
  if (mode !== 'solo') return;
  game.restart();
  receive(game.snapshot());
  controls.lock();
};
drawChart($('lobby-chart'));
requestAnimationFrame(frame);
