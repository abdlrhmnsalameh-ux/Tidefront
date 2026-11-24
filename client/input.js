import { clamp } from '../shared/map.js';

export class Controls {
  constructor(canvas, command) {
    this.canvas = canvas;
    this.command = command;
    this.keys = new Set();
    this.buttons = new Set();
    this.touch = matchMedia('(pointer: coarse)').matches;
    this.yaw = 0;
    this.pitch = 0;
    this.slot = 1;
    this.action = 0;
    this.move = [0, 0];
    this.active = false;
    this.sequence = 0;
    this.lookPointer = null;
    window.addEventListener('keydown', event => this.keyboard(event, true));
    window.addEventListener('keyup', event => this.keyboard(event, false));
    window.addEventListener('blur', () => this.clear());
    window.addEventListener('contextmenu', event => { if (this.active) event.preventDefault(); });
    document.addEventListener('pointerlockchange', () => { if (!document.pointerLockElement) this.buttons.clear(); });
    document.addEventListener('pointermove', event => {
      if (!this.active) return;
      if (document.pointerLockElement === canvas || event.pointerId === this.lookPointer) {
        this.look(event.movementX, event.movementY);
      }
    });
    canvas.addEventListener('pointerdown', event => {
      if (!this.active) return;
      const locked = document.pointerLockElement === canvas;
      if (!locked) {
        this.lookPointer = event.pointerId;
        canvas.setPointerCapture(event.pointerId);
        if (event.pointerType === 'mouse' && event.button === 0) this.lock();
      }
      if (locked && event.button < 3) this.buttons.add(event.button === 2 ? 'alt' : 'fire');
    });
    const release = event => {
      if (event.pointerId === this.lookPointer) this.lookPointer = null;
      if (event.button === 0) this.buttons.delete('fire');
      if (event.button === 2) this.buttons.delete('alt');
    };
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    this.touchControls();
  }

  lock() {
    if (!this.active || this.touch || !this.canvas.requestPointerLock) return;
    try { this.canvas.requestPointerLock()?.catch?.(() => {}); } catch { /* Drag remains available. */ }
  }

  clear() {
    this.keys.clear();
    this.buttons.clear();
    this.move = [0, 0];
    this.lookPointer = null;
    this.action = 0;
    document.querySelector('#stick i').style.transform = '';
  }

  enable(active) {
    if (active === this.active) return;
    this.clear();
    this.active = active;
    if (!active && document.pointerLockElement === this.canvas) document.exitPointerLock();
  }

  look(dx, dy) {
    this.yaw = Math.atan2(Math.sin(this.yaw + dx * .0027), Math.cos(this.yaw + dx * .0027));
    this.pitch = clamp(this.pitch - dy * .0025, -1.07, 1.05);
  }

  keyboard(event, down) {
    if (!down) {
      this.keys.delete(event.code);
      return;
    }
    if (event.target instanceof HTMLInputElement) return;
    if (event.code === 'Escape') {
      if (!event.repeat) this.command('escape');
      return;
    }
    if (event.code === 'KeyM') {
      if (!event.repeat) this.command('tactical');
      return;
    }
    if (!this.active) return;
    if (['Space', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.code)) event.preventDefault();
    this.keys.add(event.code);
    if (event.repeat) return;
    switch (event.code) {
      case 'KeyE': this.action |= 1; break;
      case 'KeyG': this.action |= 2; break;
      case 'KeyR': this.action |= 4; break;
      case 'Digit1': this.slot = 1; break;
      case 'Digit2': this.slot = 2; break;
      case 'Tab': this.command('roster'); break;
      case 'KeyC': this.command('camera'); break;
    }
  }

  tick(dt) {
    if (!this.active) return;
    const axis = key => Number(this.keys.has(key));
    this.look((axis('ArrowRight') - axis('ArrowLeft')) * dt * 480, (axis('ArrowDown') - axis('ArrowUp')) * dt * 420);
  }

  packet() {
    const key = id => Number(this.keys.has(id));
    const axis = this.active ? this.move : [0, 0];
    const packet = {
      w: Math.max(key('KeyW'), -axis[1]), s: Math.max(key('KeyS'), axis[1]),
      a: Math.max(key('KeyA'), -axis[0]), d: Math.max(key('KeyD'), axis[0]),
      yaw: this.yaw, pitch: this.pitch,
      up: Boolean(key('Space') || this.buttons.has('up')),
      down: Boolean(key('KeyQ') || this.buttons.has('down')),
      boost: Boolean(key('ShiftLeft') || key('ShiftRight')),
      fire: this.buttons.has('fire') || Boolean(key('KeyF')),
      alt: this.buttons.has('alt') || Boolean(key('KeyX')),
      slot: this.slot, seq: ++this.sequence, action: this.action,
    };
    this.action = 0;
    return packet;
  }

  touchControls() {
    if (!this.touch) return;
    document.querySelector('#touch').hidden = false;
    const stick = document.querySelector('#stick');
    const handle = stick.querySelector('i');
    let pointer = null;
    const move = event => {
      if (!this.active || event.pointerId !== pointer) return;
      const rect = stick.getBoundingClientRect();
      let x = (event.clientX - rect.left - rect.width * .5) / (rect.width * .38);
      let y = (event.clientY - rect.top - rect.height * .5) / (rect.height * .38);
      const size = Math.max(1, Math.hypot(x, y));
      x /= size; y /= size;
      this.move = [x, y];
      handle.style.transform = `translate(${x * 27}px,${y * 27}px)`;
    };
    stick.addEventListener('pointerdown', event => {
      if (!this.active || pointer !== null) return;
      pointer = event.pointerId;
      stick.setPointerCapture(pointer);
      move(event);
    });
    stick.addEventListener('pointermove', move);
    const stop = event => {
      if (event.pointerId !== pointer) return;
      pointer = null;
      this.move = [0, 0];
      handle.style.transform = '';
    };
    stick.addEventListener('pointerup', stop);
    stick.addEventListener('pointercancel', stop);
    for (const button of document.querySelectorAll('[data-hold]')) {
      const name = button.dataset.hold;
      button.addEventListener('pointerdown', event => {
        if (!this.active) return;
        button.setPointerCapture(event.pointerId);
        this.buttons.add(name);
      });
      for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
        button.addEventListener(type, () => this.buttons.delete(name));
      }
    }
    document.querySelector('[data-action="interact"]').addEventListener('click', () => { if (this.active) this.action |= 1; });
    document.querySelector('[data-action="special"]').addEventListener('click', () => { if (this.active) this.command('special'); });
  }
}
