export const STEP = 1 / 30;
export const TEAM_SIZE = 8;
export const HOLD_SECONDS = 12;
export const CAPTURE_SECONDS = 6.5;
export const RESPAWN_SECONDS = 5;
export const DECK = { y: 1.44, halfWidth: 6.3, bow: -10, stern: 14, ramp: 20 };

// Balance values are expressed in game units.
export const ARMS = {
  rifle:   { name: 'AK-47', damage: 18, interval: .115, speed: 190, fall: 1.5, capacity: 30, reload: 1.35, life: 1.55 },
  rocket:  { name: 'RPG', damage: 86, interval: .84, speed: 83, fall: 1.75, blast: 6.4, capacity: 1, reload: 2.1, life: 5.0 },
  gun:     { name: 'Machine gun', damage: 17, interval: .13, speed: 211, fall: 1.2, life: 1.8 },
  cannon:  { name: 'Main cannon', damage: 116, interval: 2.15, speed: 156, fall: 2.3, blast: 8.0, life: 4.0 },
  salvo:   { name: 'Rocket artillery', damage: 125, interval: 2.3, speed: 116, fall: 6.5, blast: 12.5, life: 7.0 },
  airgun:  { name: 'Autocannon', damage: 27, interval: .095, speed: 235, fall: .8, life: 2.0 },
  missile: { name: 'Air-to-ground missile', damage: 137, interval: 2.7, speed: 132, fall: 1.35, blast: 9.0, life: 5.8 },
  ballistic: { name: 'Meridian missile', damage: 198, interval: 12, fall: 16, blast: 16, life: 12 },
};

export const VEHICLES = {
  recon:     { name: 'Warden Recon', w: 2.8, h: 1.95, l: 5.1, hp: 180, mass: 1600, speed: 28, accel: 10, steer: 1.6, primary: 'gun' },
  tank:      { name: 'Bastion Tank', w: 3.55, h: 2.42, l: 6.9, hp: 440, mass: 8800, speed: 17, accel: 4.7, steer: 1.12, primary: 'cannon', secondary: 'gun' },
  launcher:  { name: 'Lancer Artillery', w: 3.16, h: 2.8, l: 7.35, hp: 265, mass: 5300, speed: 21, accel: 5.1, steer: 1.0, primary: 'salvo' },
  ballistic: { name: 'Meridian Ballistic Launcher', w: 3.45, h: 3.06, l: 7.98, hp: 295, mass: 7200, speed: 18, accel: 4.4, steer: .88, primary: 'ballistic' },
  jet:       { name: 'Kestrel Fighter', w: 8.5, h: 2.5, l: 12.3, hp: 240, mass: 4900, speed: 109, accel: 22, steer: 1.04, primary: 'airgun', secondary: 'missile', rotate: 34 },
  transport: { name: 'Marlin Landing Ship', w: 14.6, h: 4.2, l: 32, hp: 710, mass: 15500, speed: 14, accel: 2.9, steer: .44, primary: 'gun' },
};

export function emptyInput(yaw = 0) {
  return { w: 0, s: 0, a: 0, d: 0, yaw, pitch: 0, up: false, down: false,
    boost: false, fire: false, alt: false, slot: 0, action: 0, seq: -1 };
}

export function readInput(raw) {
  if (!raw || typeof raw !== 'object' || !Number.isSafeInteger(raw.seq) || raw.seq < 0) return null;
  const axis = value => Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
  return {
    w: axis(raw.w), s: axis(raw.s), a: axis(raw.a), d: axis(raw.d),
    yaw: Number.isFinite(raw.yaw) ? Math.atan2(Math.sin(raw.yaw), Math.cos(raw.yaw)) : 0,
    pitch: Number.isFinite(raw.pitch) ? Math.max(-1.45, Math.min(1.35, raw.pitch)) : 0,
    boost: raw.boost === true, up: raw.up === true, down: raw.down === true,
    fire: raw.fire === true, alt: raw.alt === true,
    slot: raw.slot === 2 ? 2 : raw.slot === 1 ? 1 : 0,
    action: Number.isSafeInteger(raw.action) ? raw.action & 7 : 0, seq: raw.seq,
  };
}
