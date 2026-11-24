import assert from 'node:assert/strict';
import test from 'node:test';
import * as T from 'three';
import { Effects } from '../client/effects.js';
import { viewWeapon } from '../client/models.js';
import { makeLandscape } from '../client/scenery.js';
import { unpack } from '../client/snapshot.js';
import { View } from '../client/view.js';
import { POINTS } from '../shared/map.js';
import { Match } from '../shared/match.js';

test('Three scene assembles and advances for infantry and every vehicle view', () => {
  const previous = globalThis.document;
  globalThis.document = { createElement: () => ({
    getContext: () => ({
      createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
      putImageData() {}, fillRect() {}, createRadialGradient: () => ({ addColorStop() {} }),
    }),
  }) };
  try {
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera();
    const game = new Match();
    const human = game.join('Test');
    let rendered = 0;
    const view = Object.assign(Object.create(View.prototype), {
      scene, camera, units: new Map(), snap: true, wide: false, recoil: 0,
      desired: new T.Vector3(), look: new T.Vector3(), vector: new T.Vector3(),
      landscape: makeLandscape(scene), effects: new Effects(scene), armory: [viewWeapon('rifle'), viewWeapon('rocket')],
      points: POINTS.map(() => ({ material: new T.MeshBasicMaterial() })),
      notches: POINTS.map(() => ({ style: { setProperty() {} } })),
      renderer: { render(renderedScene, activeCamera) {
        assert.equal(renderedScene, scene);
        assert.ok(activeCamera.position.toArray().every(Number.isFinite));
        rendered++;
      } },
    });
    function draw() {
      const state = unpack(game.snapshot());
      const me = state.players.find(p => p.id === human.id);
      view.frame(state, me, { yaw: me.yaw, pitch: 0 }, 1 / 30, state.time);
    }
    draw();
    assert.equal(view.armory[0].visible, true);
    assert.equal(view.units.size, game.players.length + game.vehicles.length);
    for (const vehicle of game.vehicles.filter(v => v.team === 0)) {
      game.enter(human, vehicle);
      game.step();
      draw();
      assert.ok(view.units.get(vehicle.id).root.visible);
      assert.equal(view.armory[0].visible, false);
      game.exit(human, true);
    }
    assert.equal(rendered, 1 + game.vehicles.filter(v => v.team === 0).length);
    assert.ok(scene.children.some(object => object.isInstancedMesh));
  } finally {
    globalThis.document = previous;
  }
});
