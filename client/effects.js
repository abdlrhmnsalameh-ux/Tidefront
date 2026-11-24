import * as T from 'three';
import { seededRandom } from '../shared/map.js';

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.puffs = [];
    this.trails = new Map();
    this.trailTime = 0;
    this.random = seededRandom(27701);
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 64;
    const context = canvas.getContext('2d');
    const fill = context.createRadialGradient(32, 32, 3, 32, 32, 31);
    fill.addColorStop(0, 'rgba(255,255,255,1)');
    fill.addColorStop(.25, 'rgba(255,255,255,.86)');
    fill.addColorStop(.52, 'rgba(255,255,255,.43)');
    fill.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = fill;
    context.fillRect(0, 0, 64, 64);
    this.smoke = new T.CanvasTexture(canvas);
    this.lines = new T.BufferGeometry();
    this.positions = new Float32Array(384 * 6);
    this.colors = new Float32Array(384 * 6);
    this.lines.setAttribute('position', new T.BufferAttribute(this.positions, 3).setUsage(T.DynamicDrawUsage));
    this.lines.setAttribute('color', new T.BufferAttribute(this.colors, 3).setUsage(T.DynamicDrawUsage));
    const traces = new T.LineSegments(this.lines, new T.LineBasicMaterial({ vertexColors: true, transparent: true,
      opacity: .92, blending: T.AdditiveBlending, depthWrite: false }));
    traces.frustumCulled = false;
    scene.add(traces);
  }

  puff(x, y, z, size, color, life, lift, bright = false) {
    if (this.puffs.length >= 120) this.release(this.puffs.shift());
    const surface = new T.SpriteMaterial({ color, map: this.smoke, transparent: true, opacity: .9,
      depthWrite: false, blending: bright ? T.AdditiveBlending : T.NormalBlending });
    const sprite = new T.Sprite(surface);
    sprite.position.set(x, y, z);
    sprite.scale.setScalar(size);
    this.scene.add(sprite);
    this.puffs.push({ sprite, size, life, lift, age: 0, dust: bright ? 1 : .62 });
  }

  release(puff) {
    puff.sprite.removeFromParent();
    puff.sprite.material.dispose();
  }

  event(event) {
    const { x, y, z, type, kind } = event;
    if (type === 'blast') {
      const s = event.radius ?? 6;
      this.puff(x, y + .69, z, s * .65, '#ffbd65', .26, 4, true);
      this.puff(x, y + 1.26, z, s * .37, '#fff0bf', .145, 3, true);
      for (let i = 0; i < 7; i++) {
        const theta = i / 7 * Math.PI * 2;
        const spread = this.random() * s * .52;
        this.puff(x + Math.cos(theta) * spread, y + .3 + this.random() * 1.25, z + Math.sin(theta) * spread,
          s * (.39 + this.random() * .23), i < 3 ? '#6b6960' : '#4f5050', 1.18 + this.random(), 1.43);
      }
    } else if (type === 'fire') {
      this.puff(x, y, z, kind === 'ballistic' ? 2.4 : kind === 'cannon' || kind === 'salvo' ? 1.5 : .47, '#ffd389', .11, .25, true);
    } else if (type === 'impact') {
      this.puff(x, y + .14, z, event.wet ? .77 : .31, event.wet ? '#e1f0e9' : '#bbb09b', .38, .66);
    }
  }

  update(dt, shots, age) {
    this.trailTime += dt;
    const liveTrails = new Set();
    for (let i = this.puffs.length - 1; i >= 0; i--) {
      const puff = this.puffs[i];
      puff.age += dt;
      if (puff.age >= puff.life) {
        this.release(puff);
        this.puffs.splice(i, 1);
        continue;
      }
      const p = puff.age / puff.life;
      puff.sprite.material.opacity = (1 - p) ** 1.35 * puff.dust;
      puff.sprite.position.y += dt * puff.lift;
      puff.sprite.scale.setScalar(puff.size * (.65 + p * 1.55));
    }
    const length = Math.min(384, shots.length);
    for (let i = 0; i < length; i++) {
      const [id, kind, x, y, z, vx, vy, vz] = shots[i];
      const dark = kind === 'rocket' || kind === 'salvo' || kind === 'missile' || kind === 'ballistic';
      if (dark) {
        liveTrails.add(id);
        const last = this.trails.get(id) ?? -1;
        if (this.trailTime - last > .056) {
          this.puff(x - vx * .025, y - vy * .025, z - vz * .025,
            kind === 'ballistic' ? 1.25 : kind === 'salvo' ? .93 : .66, '#c9c0a5', .91, .31);
          this.trails.set(id, this.trailTime);
        }
      }
      const trail = dark ? .063 : .019;
      this.positions.set([x + vx * age, y + vy * age, z + vz * age, x + vx * (age - trail),
        y + vy * (age - trail), z + vz * (age - trail)], i * 6);
      this.colors.set(dark ? [1,.83,.43,.32,.18,.11] : [1,.91,.56,.38,.21,.08], i * 6);
    }
    for (const id of this.trails.keys()) if (!liveTrails.has(id)) this.trails.delete(id);
    this.lines.setDrawRange(0, length * 2);
    this.lines.attributes.position.needsUpdate = true;
    this.lines.attributes.color.needsUpdate = true;
  }
}

export class GameAudio {
  constructor() { this.enabled = true; }
  unlock() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    if (!this.context) {
      const ctx = this.context = new Audio();
      const frames = Math.floor(ctx.sampleRate * .7);
      this.noise = ctx.createBuffer(1, frames, ctx.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
    }
    this.context.resume().catch(() => {});
  }
  sound(event, focus) {
    const ctx = this.context;
    if (!ctx || !this.enabled || ctx.state !== 'running') return;
    const blast = event.type === 'blast';
    if (event.type !== 'fire' && !blast && event.type !== 'captured') return;
    const range = Math.hypot(event.x - focus.x, event.y - focus.y, event.z - focus.z);
    if (range > 375) return;
    if (event.type === 'captured') {
      const node = ctx.createOscillator();
      const gain = ctx.createGain();
      node.frequency.setValueAtTime(262, ctx.currentTime);
      node.frequency.setValueAtTime(392, ctx.currentTime + .13);
      gain.gain.setValueAtTime(.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .35);
      node.connect(gain).connect(ctx.destination);
      node.start();
      node.stop(ctx.currentTime + .36);
      return;
    }
    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = blast ? 175 : event.kind === 'rifle' ? 1400 : 770;
    const gain = ctx.createGain();
    const length = blast ? .54 : .145;
    gain.gain.setValueAtTime(Math.max(.005, (blast ? .57 : .26) / (1 + range * .11)), ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + length);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
    source.stop(ctx.currentTime + length);
  }
}
