export const WORLD = { x: 486, z: 373, water: 0 };
export const TEAMS = [
  { name: 'Aster', color: '#73c6ed', side: -1, dockZ: -18 },
  { name: 'Veyra', color: '#f39467', side: 1, dockZ: 18 },
];
export const POINTS = [
  { id: 'A', name: 'Aster Command', home: 0, x: -351, z: 0, radius: 26 },
  { id: 'B', name: 'North Battery', home: 0, x: -112, z: -327, radius: 24 },
  { id: 'C', name: 'Breakwater Camp', home: 0, x: -112, z: 327, radius: 24 },
  { id: 'D', name: 'Veyra Command', home: 1, x: 351, z: 0, radius: 26 },
  { id: 'E', name: 'Ridge Station', home: 1, x: 112, z: -327, radius: 24 },
  { id: 'F', name: 'South Relay', home: 1, x: 112, z: 327, radius: 24 },
];

export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
export const mix = (a, b, t) => a + (b - a) * t;
export const angleDelta = (to, from) => Math.atan2(Math.sin(to - from), Math.cos(to - from));
export const heading = (dx, dz) => Math.atan2(dx, -dz);
export const forward = yaw => [Math.sin(yaw), -Math.cos(yaw)];
export const smooth = (min, max, n) => {
  const t = clamp((n - min) / (max - min), 0, 1);
  return t * t * (3 - 2 * t);
};

export function coastWidth(z) {
  const surf = smooth(37, 100, Math.abs(z));
  return 147 + surf * (13 * Math.sin(z * .037) + 10 * Math.cos(z * .021));
}

export function heightAt(x, z) {
  const ax = Math.abs(x);
  const az = Math.abs(z);
  const coast = ax - coastWidth(z);
  const bridge = az - 300 + 7 * Math.sin(x * .027);
  const land = Math.max(coast, bridge);
  if (land <= 0) return Math.max(-14, land * .18);

  const beach = smooth(0, 57, land);
  const variation = 7 + 7 * Math.sin(x * .023 + z * .013) ** 2
    + 17 * Math.sin(z * .016 - ax * .012) ** 4;
  const mountain = smooth(220, 465, ax) * variation;
  let height = .1 + beach * (.9 + mountain) + Math.min(land, 12) * .065;
  const runway = (1 - smooth(10, 27, Math.abs(ax - 253))) * (1 - smooth(135, 154, az));
  height = mix(height, 2.1, runway * smooth(8, 21, coast));
  const mainRoad = 1 - smooth(3, 13, Math.abs(z));
  height = mix(height, Math.min(.46 + land * .039, 2.15), mainRoad * smooth(1, 19, coast) * (1 - runway));
  const flankRoad = 1 - smooth(3, 16, Math.abs(az - 326));
  height = mix(height, 1.48, flankRoad * smooth(0, 22, land));
  const base = POINTS.some(p => (x - p.x) ** 2 + (z - p.z) ** 2 < 31 ** 2);
  if (base) {
    const point = POINTS.find(p => (x - p.x) ** 2 + (z - p.z) ** 2 < 31 ** 2);
    height = mix(point.z === 0 ? 2.15 : 1.48, height,
      smooth(18, 31, Math.hypot(x - point.x, z - point.z)));
  }
  return height;
}

export const ROADS = [
  [[-470, -326], [470, -326]], [[-470, 326], [470, 326]],
  [[-459, 0], [-146, 0]], [[146, 0], [459, 0]],
  [[-351, -326], [-351, 326]], [[351, -326], [351, 326]],
];

export function dockFor(team) {
  const { side, dockZ } = TEAMS[team];
  return { x: side * 122, z: dockZ, yaw: -side * Math.PI / 2 };
}

export const OBSTACLES = [
  ...POINTS.flatMap(p => [
    { x: p.x - 20, z: p.z - 18, w: 8, d: 5.5, h: 3.3, kind: 'bunker', team: p.home },
    { x: p.x + 14, z: p.z + (p.z > 0 ? -19 : 19), w: 7.8, d: 3, h: 2.5, kind: 'crate', team: p.home },
  ]),
  ...TEAMS.flatMap(({ side }, team) => [
    { x: side * 294, z: -60, w: 27, d: 18, h: 9, kind: 'hangar', team },
    { x: side * 405, z: 20, w: 21, d: 15, h: 7, kind: 'hangar', team },
    { x: side * 313, z: 57, w: 13, d: 6, h: 4, kind: 'crate', team },
  ]),
];

export const VEHICLE_SPAWNS = TEAMS.flatMap(({ side }, team) => [
  { type: 'recon', team, x: side * 329, z: 12, yaw: -side * Math.PI / 2 },
  { type: 'recon', team, x: side * 332, z: -305, yaw: -side * Math.PI / 2 },
  { type: 'tank', team, x: side * 313, z: -12, yaw: -side * Math.PI / 2 },
  { type: 'tank', team, x: side * 321, z: 306, yaw: -side * Math.PI / 2 },
  { type: 'launcher', team, x: side * 300, z: 15, yaw: -side * Math.PI / 2 },
  { type: 'jet', team, x: side * 253, z: 118, yaw: 0 },
  { type: 'jet', team, x: side * 253, z: -118, yaw: Math.PI },
  { type: 'transport', team, ...dockFor(team) },
]).concat(TEAMS.flatMap(({ side }, team) => ['recon', 'tank', 'launcher', 'ballistic'].map((type, i) => ({
  type, team, x: side * 338, z: 22 + i * 12, yaw: -side * Math.PI / 2, reserve: true,
}))));

export function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
