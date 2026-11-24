import * as T from 'three';
import { Effects } from './effects.js';
import { makeLandscape } from './scenery.js';
import { soldierModel, vehicleModel, viewWeapon } from './models.js';
import { angleDelta, clamp, forward, heightAt, POINTS, TEAMS } from '../shared/map.js';
import { DECK } from '../shared/rules.js';

export class View {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, matchMedia('(pointer: coarse)').matches ? 1.25 : 1.6));
    this.renderer.outputColorSpace = T.SRGBColorSpace;
    this.renderer.toneMapping = T.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = !matchMedia('(pointer: coarse)').matches;
    this.renderer.shadowMap.type = T.PCFSoftShadowMap;
    this.scene = new T.Scene();
    this.scene.add(this.camera = new T.PerspectiveCamera(65, 1, .055, 1490));
    this.camera.rotation.order = 'YXZ';
    this.desired = new T.Vector3();
    this.look = new T.Vector3();
    this.vector = new T.Vector3();
    this.units = new Map();
    this.landscape = makeLandscape(this.scene);
    this.effects = new Effects(this.scene);
    this.armory = [viewWeapon('rifle'), viewWeapon('rocket')];
    this.camera.add(...this.armory);
    this.focus = this.camera.position;
    this.snap = true;
    this.wide = false;
    this.recoil = 0;
    this.points = POINTS.map(point => {
      const ring = new T.Mesh(new T.RingGeometry(point.radius - .16, point.radius, 68).rotateX(-Math.PI / 2),
        new T.MeshBasicMaterial({ color: TEAMS[point.home].color, opacity: .28, transparent: true, depthWrite: false,
          side: T.DoubleSide }));
      const position = ring.geometry.attributes.position;
      for (let i = 0; i < position.count; i++) position.setY(i, heightAt(point.x + position.getX(i), point.z + position.getZ(i)) + .136);
      ring.position.set(point.x, 0, point.z);
      this.scene.add(ring);
      return ring;
    });
    this.notches = POINTS.map(p => {
      const node = document.createElement('div');
      node.className = 'flag-marker';
      node.textContent = p.id;
      document.querySelector('#world-markers').append(node);
      return node;
    });
    this.resize();
    new ResizeObserver(() => this.resize()).observe(canvas);
  }

  resize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  model(unit) {
    if (!this.units.has(unit.id)) {
      const item = unit.type ? vehicleModel(unit.type, unit.team) : soldierModel(unit.team);
      item.yaw = unit.yaw;
      item.root.position.set(unit.x, unit.y, unit.z);
      this.units.set(unit.id, item);
      this.scene.add(item.root);
    }
    return this.units.get(unit.id);
  }

  frame(state, me, input, dt, stamp) {
    if (!me) return;
    const factor = 1 - Math.exp(-dt * 15);
    const fade = 1 - Math.exp(-dt * 8.4);
    const vehicle = state.vehicles.find(v => v.id === me.vehicle);
    const focus = vehicle ?? me;
    const flights = (state.support?.flights ?? []).map(flight => ({ ...flight, type: 'jet', airborne: true, pitch: 0 }));
    const units = [...state.vehicles, ...state.players, ...flights];
    const present = new Set(units.map(unit => unit.id));
    for (const [id, item] of this.units) if (!present.has(id)) item.root.visible = false;
    for (const unit of units) {
      const item = this.model(unit);
      const visible = unit.type ? !unit.dead : unit.respawn === null;
      const isPlayer = !unit.type;
      item.root.visible = visible && !(isPlayer && (unit.vehicle || unit.id === me.id && !this.wide))
        && Math.hypot(unit.x - focus.x, unit.z - focus.z) < 485;
      const root = item.root;
      if (this.snap || Math.hypot(root.position.x - unit.x, root.position.z - unit.z) > 42) {
        root.position.set(unit.x, unit.y, unit.z);
        item.yaw = unit.yaw;
      } else {
        root.position.lerp(this.vector.set(unit.x, unit.y, unit.z), factor);
        item.yaw += angleDelta(unit.yaw, item.yaw) * factor;
      }
      root.rotation.set(unit.pitch * (isPlayer ? 0 : 1), -item.yaw, unit.roll ?? 0, 'YXZ');
      if (item.turret) {
        item.turret.rotation.y = -angleDelta(unit.turret, item.yaw);
        item.gun.rotation.x = unit.aimPitch;
        item.gun.position.z = (unit.recoil ?? 0) * (unit.type === 'tank' ? .43 : .11);
      }
      if (item.wheels?.length) for (const wheel of item.wheels) wheel.rotateY(unit.speed * dt / .55);
      if (item.treads && root.visible) {
        item.trackDistance = ((item.trackDistance ?? 0) + unit.speed * dt + 14) % 14;
        for (const { link, offset } of item.treads) {
          const phase = (item.trackDistance + offset) % 14;
          const lower = phase < 6;
          const upper = phase >= 7 && phase < 13;
          link.position.y = lower ? -1.136 : upper ? -.075 : phase < 7 ? -1.136 + (phase - 6) * 1.061 : -.075 - (phase - 13) * 1.061;
          link.position.z = lower ? phase - 3 : upper ? 10 - phase : phase < 7 ? 3.05 : -3.05;
          link.rotation.x = lower || upper ? 0 : Math.PI * .5;
        }
      }
      if (item.gear) item.gear.visible = !unit.airborne || unit.y < heightAt(unit.x, unit.z) + 8;
      if (item.ramp) {
        const [fx, fz] = forward(unit.yaw);
        const reach = DECK.stern + DECK.ramp - .8;
        const floor = Math.max(.06, heightAt(unit.x - fx * reach, unit.z - fz * reach));
        const angle = unit.ramp ? Math.atan2(unit.y + DECK.y - floor, DECK.ramp) : -Math.PI * .48;
        item.ramp.rotation.x = T.MathUtils.lerp(item.ramp.rotation.x, angle, fade);
        item.ramp.scale.z = T.MathUtils.lerp(item.ramp.scale.z, unit.ramp ? 1 : .19, fade);
        item.wake.material.uniforms.phase.value = state.time * 8.1;
        item.wake.material.uniforms.strength.value = Math.min(.48, Math.abs(unit.speed) * .045);
      }
      if (isPlayer) {
        const wave = Math.sin(stamp * (unit.swim ? 5.1 : 10.3) + unit.x * .16);
        const running = Math.min(.61, unit.speed * .065);
        item.legs[0].rotation.x = wave * running;
        item.legs[1].rotation.x = -wave * running;
        item.arms.rotation.x = unit.pitch * .64 + (unit.swim ? wave * .2 : 0);
      }
    }
    const model = this.units.get(focus.id);
    const first = !vehicle && !this.wide && me.respawn === null;
    this.recoil *= Math.exp(-dt * 18);
    if (first) {
      const bob = Math.sin(stamp * 9.3) * Math.min(.053, me.speed * .006);
      this.camera.position.copy(model.root.position).add(this.vector.set(0, .69 + bob, 0));
      this.camera.rotation.set(input.pitch + this.recoil * .27, -input.yaw, 0, 'YXZ');
    } else {
      const yaw = vehicle?.type === 'jet' ? model.yaw : input.yaw;
      const [fx, fz] = forward(yaw);
      const sizes = { recon: [10.5, 4.4], tank: [13.5, 4.8], launcher: [14, 5.3], ballistic: [15, 5.8], jet: [22, 6.2], transport: [38, 12] };
      const [setback, up] = sizes[vehicle?.type] ?? [5.34, 2.16];
      const distance = vehicle && this.wide ? setback * 1.54 : setback;
      this.desired.copy(model.root.position).add(this.vector.set(-fx * distance, up + Math.max(-.7, input.pitch * 2.1), -fz * distance));
      this.desired.y = Math.max(this.desired.y, heightAt(this.desired.x, this.desired.z) + .85);
      if (this.snap || this.camera.position.distanceTo(this.desired) > 60) this.camera.position.copy(this.desired);
      else this.camera.position.lerp(this.desired, fade);
      this.look.copy(model.root.position).add(this.vector.set(fx * 12.8, .82 + this.recoil + Math.sin(vehicle?.type === 'jet'
        ? vehicle.pitch : input.pitch) * 11, fz * 12.8));
      this.camera.lookAt(this.look);
    }
    this.armory.forEach((gun, i) => {
      gun.visible = first && me.slot === i + 1;
      gun.position.set(.28 + Math.cos(stamp * 5) * Math.min(.018, me.speed * .0016),
        -.35 - (me.reload > state.time ? .15 : 0), -.53 + this.recoil * .13);
      gun.rotation.set(me.reload > state.time ? -.34 : 0, -.10, -.04);
    });
    this.camera.updateMatrixWorld();
    this.landscape.update(stamp, model.root.position);
    this.points.forEach((ring, index) => {
      const point = POINTS[index];
      const d = Math.hypot(point.x - focus.x, point.z - focus.z);
      const statePoint = state.points[index];
      ring.material.color.set(TEAMS[statePoint[0]].color);
      ring.material.opacity = statePoint[3] ? .58 + .18 * Math.sin(stamp * 7) : .35;
      this.vector.set(point.x, heightAt(point.x, point.z) + 8.4, point.z);
      const ahead = this.look.copy(this.vector).sub(this.camera.position).dot(this.camera.getWorldDirection(this.desired)) > 0;
      this.vector.project(this.camera);
      const flag = this.notches[index];
      const visible = ahead && d > 7 && d < 510 && Math.abs(this.vector.x) < .95 && Math.abs(this.vector.y) < .88;
      flag.hidden = !visible;
      if (visible) {
        flag.style.left = (this.vector.x * 50 + 50) + '%';
        flag.style.top = (50 - this.vector.y * 50) + '%';
        flag.style.setProperty('--team', TEAMS[statePoint[0]].color);
        flag.title = point.name;
      }
    });
    this.effects.update(dt, state.shots, Math.min(.06, state.renderAge ?? 0));
    this.renderer.render(this.scene, this.camera);
    this.snap = false;
  }
}
