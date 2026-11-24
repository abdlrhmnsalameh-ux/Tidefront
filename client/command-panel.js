import { chartPoint, drawChart, worldPoint } from './chart.js';
import { POINTS, TEAMS, WORLD, clamp } from '../shared/map.js';
import { commandPath } from '../shared/navigation.js';
import { PURCHASES } from '../shared/support.js';
import { BALLISTIC_RANGE } from '../shared/ballistics.js';

export class CommandPanel {
  constructor(send) {
    const get = id => document.getElementById(id);
    this.canvas = get('full-chart');
    this.list = get('command-units');
    this.hold = get('hold-unit');
    this.release = get('release-unit');
    this.selectGroup = get('select-group');
    this.mergeGroup = get('merge-group');
    this.splitGroup = get('split-group');
    this.hint = get('command-hint');
    this.faction = get('command-faction');
    this.notice = get('command-notice');
    this.points = get('support-points');
    this.queue = get('support-queue');
    this.markBallistic = get('mark-ballistic');
    this.purchases = Object.entries(PURCHASES).map(([type, item]) => {
      const node = document.createElement('button');
      node.type = 'button';
      node.className = 'secondary';
      const price = document.createElement('span');
      node.textContent = item.label;
      price.textContent = item.cost;
      node.append(price);
      node.addEventListener('click', () => this.buy(type));
      get('support-actions').append(node);
      return { type, item, node };
    });
    this.objectives = POINTS.map(p => {
      const node = document.createElement('span');
      node.textContent = p.id + '  ' + p.name;
      get('objectives').append(node);
      return node;
    });
    this.send = send;
    this.rows = new Map();
    this.reset();
    this.canvas.addEventListener('click', event => this.click(event));
    this.canvas.addEventListener('keydown', event => this.aim(event));
    this.hold.addEventListener('click', () => this.order('hold'));
    this.release.addEventListener('click', () => this.order('release'));
    this.selectGroup.addEventListener('click', () => {
      this.merging = !this.merging;
      this.selection.clear();
      this.strikeTarget = false;
      this.launcherTarget = false;
      this.cursor = null;
      this.refresh();
    });
    this.mergeGroup.addEventListener('click', () => this.dispatch({ kind: 'merge', units: [...this.selection] }));
    this.splitGroup.addEventListener('click', () => this.order('split'));
    this.markBallistic.addEventListener('click', () => {
      this.launcherTarget = !this.launcherTarget;
      this.merging = this.strikeTarget = false;
      this.selection.clear();
      this.cursor = null;
      this.refresh();
    });
  }

  reset() {
    this.state = null;
    this.marker = null;
    this.selected = null;
    this.requestedGroup = null;
    this.merging = false;
    this.selection = new Set();
    this.strikeTarget = false;
    this.launcherTarget = false;
    this.launcher = null;
    this.cursor = null;
    this.units = [];
    this.allowed = false;
    this.request = (this.request ?? 0) + 1;
    this.pending = false;
    this.routeKey = '';
    this.path = [];
    this.message('');
  }

  unitRow(unit) {
    if (!this.rows.has(unit.id)) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'command-unit';
      const badge = document.createElement('span');
      badge.className = 'unit-badge';
      badge.setAttribute('aria-hidden', 'true');
      const copy = document.createElement('span');
      copy.className = 'unit-copy';
      const name = document.createElement('strong');
      const status = document.createElement('small');
      copy.append(name, status);
      button.append(badge, copy);
      button.addEventListener('click', () => this.choose(unit.id));
      this.rows.set(unit.id, { button, badge, name, status });
      this.list.append(button);
    }
    return this.rows.get(unit.id);
  }

  update(state, me, marker) {
    this.state = state;
    this.marker = marker;
    this.launcher = marker?.type === 'ballistic' ? marker : null;
    if (!this.launcher) this.launcherTarget = false;
    this.team = TEAMS[me.team];
    this.teamIndex = me.team;
    this.units = state.command?.units?.[me.team] ?? [];
    this.allowed = state.command?.leaders?.[me.team] === me.id;
    const controlled = state.points.filter(point => point[0] === me.team).length;
    this.faction.textContent = this.team.name + ' · ' + controlled + ' of ' + POINTS.length + ' bases'
      + (this.allowed ? ' · You command the AI units' : ' · Tactical view');
    const ids = new Set(this.units.map(unit => unit.id));
    if (ids.has(this.requestedGroup)) {
      this.selected = this.requestedGroup;
      this.requestedGroup = null;
    }
    if (!ids.has(this.selected)) this.selected = null;
    for (const id of this.selection) if (!ids.has(id)) this.selection.delete(id);
    if (!this.allowed) this.merging = false;
    for (const [id, row] of this.rows) {
      if (ids.has(id)) continue;
      row.button.remove();
      this.rows.delete(id);
    }
    for (const unit of this.units) {
      const row = this.unitRow(unit);
      row.badge.textContent = unit.badge;
      row.name.textContent = unit.label;
      row.status.textContent = unit.status;
      row.button.style.setProperty('--unit-color', this.team.color);
      row.button.dataset.unavailable = String(!unit.available);
    }
    this.objectives.forEach((node, index) => { node.style.color = TEAMS[state.points[index][0]].color; });
    this.refresh();
  }

  chosen() { return this.units.find(unit => unit.id === this.selected); }

  choose(id) {
    this.strikeTarget = false;
    this.launcherTarget = false;
    if (this.merging) {
      if (this.selection.has(id)) this.selection.delete(id);
      else this.selection.add(id);
      this.refresh();
      return;
    }
    if (this.selected !== id) {
      this.selected = id;
      this.cursor = null;
      this.message('');
    }
    this.refresh();
  }

  refresh() {
    const unit = this.chosen();
    const aiming = this.allowed && !this.merging && Boolean(unit?.available);
    const support = this.state?.support;
    const credits = support?.credits[this.teamIndex] ?? 0;
    this.points.textContent = credits + ' pts';
    const waiting = support?.queued?.[this.teamIndex] ?? 0;
    this.queue.hidden = waiting < 1;
    this.queue.textContent = waiting + ' queued. Move units off the Command pads to make space.';
    for (const { type, item, node } of this.purchases) {
      node.disabled = !support || !this.allowed || this.pending || credits < item.cost
        || (type === 'strike' && Boolean(support.strikes[this.teamIndex]));
      if (type === 'strike') node.setAttribute('aria-pressed', String(this.strikeTarget));
    }
    this.hold.disabled = !aiming || this.pending;
    this.release.disabled = !this.allowed || this.merging || !(unit?.canRelease ?? unit?.order) || this.pending;
    this.selectGroup.disabled = !this.allowed || this.pending || this.units.length < 2 && !this.merging;
    this.selectGroup.textContent = this.merging ? 'Cancel merge' : 'Select to merge';
    this.mergeGroup.hidden = !this.merging;
    this.mergeGroup.disabled = !this.allowed || this.pending || this.selection.size < 2;
    this.splitGroup.hidden = this.merging || unit?.type !== 'group';
    this.splitGroup.disabled = !this.allowed || this.pending;
    for (const [id, row] of this.rows) {
      row.button.setAttribute('aria-pressed', String(this.merging ? this.selection.has(id) : id === this.selected));
    }
    this.markBallistic.hidden = !this.launcher;
    this.markBallistic.disabled = this.pending;
    this.markBallistic.setAttribute('aria-pressed', String(this.launcherTarget));
    this.canvas.dataset.targeting = String(aiming || this.strikeTarget || this.launcherTarget);
    this.hint.textContent = this.launcherTarget ? 'Mark a missile target inside the range ring.'
      : !this.allowed ? 'Your team commander can issue orders from this map.'
      : this.merging ? 'Select two or more units, then choose Merge selected.'
        : this.strikeTarget ? 'Mark the strike location for the Kestrel squadron.'
        : !unit ? 'Select a unit to give it an order.'
        : aiming ? 'Mark a destination for ' + unit.label + '.'
          : unit.label + ' · ' + unit.status;
    if (!this.state) return;
    drawChart(this.canvas, this.state, this.marker);
    this.overlay(unit);
  }

  overlay(chosen) {
    const context = this.canvas.getContext('2d');
    const project = (x, z) => chartPoint(this.canvas, x, z);
    context.save();
    if (this.launcher) {
      const [x, y] = project(this.launcher.x, this.launcher.z);
      context.strokeStyle = '#efbf74';
      context.lineWidth = 1.25;
      context.setLineDash([5, 4]);
      for (const range of [BALLISTIC_RANGE.min, BALLISTIC_RANGE.max]) {
        context.beginPath();
        context.ellipse(x, y, range * this.canvas.width / (WORLD.x * 2), range * this.canvas.height / (WORLD.z * 2),
          0, 0, Math.PI * 2);
        context.stroke();
      }
      context.setLineDash([]);
      if (this.launcher.target) {
        const [tx, ty] = project(this.launcher.target.x, this.launcher.target.z);
        context.beginPath();
        context.arc(tx, ty, 13, 0, Math.PI * 2);
        context.stroke();
      }
    }
    const strike = this.state.support?.strikes[this.teamIndex];
    if (strike) {
      const [x, y] = project(strike.x, strike.z);
      context.strokeStyle = '#efbf74';
      context.lineWidth = 2;
      context.setLineDash([4, 3]);
      context.beginPath();
      context.arc(x, y, 21, 0, Math.PI * 2);
      context.stroke();
      context.setLineDash([]);
    }
    for (const unit of this.units.filter(item => item.available)) {
      const [x, y] = project(unit.x, unit.z);
      const selected = this.merging ? this.selection.has(unit.id) : unit === chosen;
      const color = selected ? '#efcb86' : this.team.color;
      if (unit.order?.kind === 'move' && selected && !this.merging) {
        const { x: tx, z: tz } = unit.order;
        const key = [unit.id, Math.round(unit.x / 16), Math.round(unit.z / 16), tx, tz].join('/');
        if (key !== this.routeKey) {
          this.routeKey = key;
          this.path = commandPath(unit.x, unit.z, tx, tz);
        }
        const [targetX, targetY] = project(tx, tz);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.setLineDash([5, 5]);
        context.beginPath();
        context.moveTo(x, y);
        for (const node of this.path) context.lineTo(...project(node.x, node.z));
        context.stroke();
        context.setLineDash([]);
        context.beginPath();
        context.arc(targetX, targetY, 9, 0, Math.PI * 2);
        context.stroke();
      }
      context.fillStyle = selected ? '#334237' : '#172928';
      context.strokeStyle = color;
      context.lineWidth = selected ? 2.5 : 1.4;
      context.fillRect(x - 14, y - 11, 28, 22);
      context.strokeRect(x - 14, y - 11, 28, 22);
      context.fillStyle = color;
      context.font = 'bold 12px system-ui';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(unit.badge, x, y + .8);
    }
    if (this.cursor && (this.launcherTarget || this.allowed && (chosen?.available || this.strikeTarget))) {
      const [x, y] = project(this.cursor.x, this.cursor.z);
      context.strokeStyle = '#ffe0a2';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(x - 8, y); context.lineTo(x + 8, y);
      context.moveTo(x, y - 8); context.lineTo(x, y + 8);
      context.stroke();
    }
    context.restore();
  }

  click(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * this.canvas.width / rect.width;
    const y = (event.clientY - rect.top) * this.canvas.height / rect.height;
    if (this.launcherTarget) return this.dispatch({ kind: 'ballistic-target', ...worldPoint(this.canvas, x, y) });
    if (this.strikeTarget) return this.buy('strike', worldPoint(this.canvas, x, y));
    const clicked = this.units.find(unit => {
      if (!unit.available) return false;
      const [ux, uy] = chartPoint(this.canvas, unit.x, unit.z);
      return Math.abs(ux - x) <= 17 && Math.abs(uy - y) <= 14;
    });
    if (clicked && !event.shiftKey) this.choose(clicked.id);
    else if (!this.merging && this.chosen()?.available && this.allowed) return this.order('move', worldPoint(this.canvas, x, y));
  }

  aim(event) {
    const unit = this.chosen();
    if (!this.launcherTarget && (this.merging || (!unit?.available && !this.strikeTarget) || !this.allowed)) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (this.cursor) {
        if (this.launcherTarget) this.dispatch({ kind: 'ballistic-target', ...this.cursor });
        else if (this.strikeTarget) this.buy('strike', this.cursor);
        else this.order('move', this.cursor);
      }
      return;
    }
    const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (!directions[event.key]) return;
    event.preventDefault();
    const [dx, dz] = directions[event.key];
    const prior = this.cursor ?? (this.launcherTarget ? this.launcher : unit ?? this.marker);
    this.cursor = { x: clamp(prior.x + dx * 12, -WORLD.x + 5, WORLD.x - 5),
      z: clamp(prior.z + dz * 12, -WORLD.z + 5, WORLD.z - 5) };
    this.refresh();
  }

  async order(kind, target = {}) {
    if (!this.selected) return;
    return this.dispatch({ ...target, kind, unit: this.selected });
  }

  buy(type, target) {
    if (type === 'strike' && !target) {
      this.launcherTarget = false;
      this.merging = false;
      this.selection.clear();
      this.strikeTarget = !this.strikeTarget;
      this.cursor = null;
      this.refresh();
      return;
    }
    return this.dispatch({ ...target, kind: 'support', support: type });
  }

  async dispatch(packet) {
    if (this.pending || (!this.allowed && !(this.launcher && packet.kind === 'ballistic-target'))) return;
    const version = ++this.request;
    this.pending = true;
    this.refresh();
    const result = await this.send(packet);
    if (version !== this.request) return;
    this.pending = false;
    this.cursor = null;
    if (!result.error && packet.support === 'strike') this.strikeTarget = false;
    if (!result.error && packet.kind === 'ballistic-target') this.launcherTarget = false;
    if (!result.error && packet.kind === 'merge') {
      this.merging = false;
      this.selection.clear();
      this.requestedGroup = result.selected;
      this.selected = result.selected;
    }
    if (!result.error && packet.kind === 'split') this.selected = null;
    this.message(result.error ?? result.message, Boolean(result.error));
    this.refresh();
  }

  message(text, error = false) {
    this.notice.textContent = text;
    this.notice.dataset.error = String(error);
  }
}
