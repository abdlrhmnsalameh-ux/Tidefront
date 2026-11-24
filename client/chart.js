import { dockFor, heightAt, POINTS, ROADS, TEAMS, WORLD } from '../shared/map.js';

const baseMaps = new WeakMap();
const inverse = (x, z, width, height) => [(x / WORLD.x + 1) * width / 2, (z / WORLD.z + 1) * height / 2];

function makeBase(canvas) {
  const { width, height } = canvas;
  const background = document.createElement('canvas');
  background.width = width;
  background.height = height;
  const context = background.getContext('2d');
  const low = document.createElement('canvas');
  low.width = 150;
  low.height = 112;
  const raster = low.getContext('2d');
  const image = raster.createImageData(low.width, low.height);
  for (let y = 0; y < low.height; y++) {
    for (let x = 0; x < low.width; x++) {
      const sx = (x / low.width * 2 - 1) * WORLD.x;
      const sz = (y / low.height * 2 - 1) * WORLD.z;
      const level = heightAt(sx, sz);
      const contour = Math.floor(level * .62) % 3 === 0 ? 3 : 0;
      const light = (heightAt(sx + 4, sz - 4) - level) * 5;
      const tint = level > 0 ? [48 + light + contour, 66 + light + contour, 57 + light + contour]
        : [23 - level * .31, 50 - level * .2, 58 - level * .13];
      if (level >= 0 && level < .52) {
        tint[0] += 20; tint[1] += 17; tint[2] += 2;
      }
      image.data.set([...tint, 255], (y * low.width + x) * 4);
    }
  }
  raster.putImageData(image, 0, 0);
  context.drawImage(low, 0, 0, width, height);
  context.strokeStyle = '#acc6b41f';
  context.lineWidth = 1;
  context.beginPath();
  for (let x = width / 10; x < width; x += width / 10) {
    context.moveTo(x, 0);
    context.lineTo(x, height);
  }
  for (let y = height / 8; y < height; y += height / 8) {
    context.moveTo(0, y);
    context.lineTo(width, y);
  }
  context.stroke();
  context.strokeStyle = '#bdb49494';
  context.beginPath();
  for (const [start, end] of ROADS) {
    context.moveTo(...inverse(...start, width, height));
    context.lineTo(...inverse(...end, width, height));
  }
  context.stroke();
  for (const { side } of TEAMS) {
    const [x, y] = inverse(side * 253, -147, width, height);
    const [, y2] = inverse(side * 253, 147, width, height);
    context.fillStyle = '#aec0b06b';
    context.fillRect(x - 2, y, 4, y2 - y);
  }
  if (width > 300) {
    context.fillStyle = '#bdd9e192';
    context.font = '600 11px system-ui';
    context.textAlign = 'center';
    context.fillText('THE STRAITS', width / 2, height * .62);
    context.fillStyle = '#e5e1bc';
    context.fillText('N', width - 14, 17);
  }
  return background;
}

export function drawChart(canvas, state, player) {
  if (!baseMaps.has(canvas)) baseMaps.set(canvas, makeBase(canvas));
  const g = canvas.getContext('2d');
  const { width, height } = canvas;
  g.drawImage(baseMaps.get(canvas), 0, 0);
  const project = (x, z) => inverse(x, z, width, height);
  const r = width > 500 ? 12 : 8.6;
  for (let team = 0; team < 2; team++) {
    const dock = dockFor(team);
    g.strokeStyle = '#edcc8a';
    for (const z of [dock.z, -Math.sign(dock.z) * 28]) {
      const [x, y] = project(dock.x, z);
      g.beginPath();
      g.moveTo(x, y - 4); g.lineTo(x + 4, y); g.lineTo(x, y + 4); g.lineTo(x - 4, y);
      g.closePath();
      g.stroke();
    }
  }
  if (state && player) {
    const [depotX, depotY] = project(TEAMS[player.team].side * 338, 34);
    g.fillStyle = '#172928';
    g.fillRect(depotX - 7, depotY - 7, 14, 14);
    g.fillStyle = '#ebcd8f';
    g.font = 'bold 10px system-ui';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText('R', depotX, depotY);
    for (const contact of state.players) {
      if (contact.id === player.id || contact.team !== player.team || contact.respawn !== null) continue;
      g.fillStyle = TEAMS[contact.team].color + 'b0';
      const [x, y] = project(contact.x, contact.z);
      g.fillRect(x - 1.6, y - 1.6, 3.2, 3.2);
    }
  }
  POINTS.forEach((point, i) => {
    const [x, y] = project(point.x, point.z);
    const team = state?.points[i][0] ?? point.home;
    g.fillStyle = '#142422';
    g.strokeStyle = TEAMS[team].color;
    g.lineWidth = 1.1;
    if (state?.points[i][3]) g.setLineDash([3, 2]);
    g.beginPath();
    g.arc(x, y, r, 0, 2 * Math.PI);
    g.fill(); g.stroke();
    g.setLineDash([]);
    g.fillStyle = g.strokeStyle;
    g.font = `bold ${Math.max(10, r * 1.15)}px system-ui`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(point.id, x, y + .7);
  });
  if (player) {
    const [x, y] = project(player.x, player.z);
    g.save();
    g.translate(x, y);
    g.rotate(player.yaw);
    g.fillStyle = '#f4e3a5';
    g.strokeStyle = '#182820';
    g.beginPath();
    g.moveTo(0, -9); g.lineTo(5, 5); g.lineTo(0, 2); g.lineTo(-5, 5);
    g.closePath(); g.fill(); g.stroke();
    g.restore();
  }
}

export function chartPoint(canvas, x, z) {
  return inverse(x, z, canvas.width, canvas.height);
}

export function worldPoint(canvas, pointX, pointY) {
  return { x: (pointX / canvas.width * 2 - 1) * WORLD.x, z: (pointY / canvas.height * 2 - 1) * WORLD.z };
}
