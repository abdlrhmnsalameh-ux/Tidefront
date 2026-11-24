import * as T from 'three';
import { seededRandom } from '../shared/map.js';

const materialCache = new Map();
const boxes = new Map();

export function material(color, metalness = .05, roughness = .82) {
  const key = [color, metalness, roughness].join('/');
  if (!materialCache.has(key)) {
    materialCache.set(key, new T.MeshStandardMaterial({ color, metalness, roughness }));
  }
  return materialCache.get(key);
}

export function box(parent, width, height, depth, x, y, z, surface, shadow = true) {
  const key = [width, height, depth].join('/');
  if (!boxes.has(key)) boxes.set(key, new T.BoxGeometry(width, height, depth));
  return mesh(parent, boxes.get(key), surface, x, y, z, shadow);
}

export function mesh(parent, geometry, surface, x = 0, y = 0, z = 0, shadow = true) {
  const node = new T.Mesh(geometry, surface);
  node.position.set(x, y, z);
  node.castShadow = shadow;
  node.receiveShadow = true;
  parent.add(node);
  return node;
}

export function cylinder(parent, radius, length, x, y, z, surface, segments = 12) {
  return mesh(parent, new T.CylinderGeometry(radius, radius, length, segments), surface, x, y, z);
}

export function sphere(parent, radius, x, y, z, surface, sx = 1, sy = 1, sz = 1) {
  const node = mesh(parent, new T.SphereGeometry(radius, 12, 8), surface, x, y, z);
  node.scale.set(sx, sy, sz);
  return node;
}

export function outline(parent, points, height, y, surface, bevel = .06) {
  const shape = new T.Shape();
  shape.moveTo(points[0][0], -points[0][1]);
  for (const [x, z] of points.slice(1)) shape.lineTo(x, -z);
  shape.closePath();
  const geometry = new T.ExtrudeGeometry(shape, {
    depth: height, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel,
    bevelSegments: 1, steps: 1, curveSegments: 1,
  });
  geometry.rotateX(-Math.PI / 2);
  return mesh(parent, geometry, surface, 0, y, 0);
}

export function grainTexture(seed = 66, size = 128) {
  const random = seededRandom(seed);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const context = canvas.getContext('2d');
  const image = context.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const index = (y * size + x) * 4;
      const u = x / size * Math.PI * 2;
      const v = y / size * Math.PI * 2;
      const n = 199 + 20 * Math.sin(u * 3 + Math.sin(v * 2)) * Math.cos(v * 4 - u)
        + 11 * Math.sin(u * 13 + v * 11) + 22 * (random() - .5);
      image.data.set([n, n, n, 255], index);
    }
  }
  context.putImageData(image, 0, 0);
  const texture = new T.CanvasTexture(canvas);
  texture.colorSpace = T.SRGBColorSpace;
  texture.wrapS = texture.wrapT = T.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}
