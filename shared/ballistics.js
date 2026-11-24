import { clamp, heading, heightAt, WORLD } from './map.js';
import { ARMS } from './rules.js';

export const BALLISTIC_RANGE = { min: 28, max: 415 };

export function ballisticAim(vehicle, target) {
  if (!target || !Number.isFinite(target.x) || !Number.isFinite(target.z)
    || Math.abs(target.x) > WORLD.x - 4 || Math.abs(target.z) > WORLD.z - 4) return null;
  const at = vehicle.body.position;
  const x = target.x - at.x;
  const z = target.z - at.z;
  const distance = Math.hypot(x, z);
  if (distance < BALLISTIC_RANGE.min || distance > BALLISTIC_RANGE.max) return null;
  const y = at.y + 2.34;
  const endY = Math.max(0, heightAt(target.x, target.z));
  const time = clamp(5 + distance * .0068, 5, 8);
  const up = (endY - y) / time + ARMS.ballistic.fall * time * .5;
  return { yaw: heading(x, z), pitch: Math.atan2(up, distance / time), x: at.x, y, z: at.z,
    vx: x / time, vy: up, vz: z / time };
}

export function designateBallistic(game, player, target) {
  const vehicle = player?.vehicle;
  if (!player?.human || player.dead || vehicle?.type !== 'ballistic' || vehicle.driver !== player || vehicle.dead) {
    return { error: 'Board a Meridian launcher to mark a missile target.' };
  }
  if (game.winner !== null) return { error: 'The round has ended.' };
  if (!ballisticAim(vehicle, target)) return { error: 'Mark a point inside the launcher ring and away from your position.' };
  vehicle.target = { x: target.x, z: target.z };
  return { message: 'Target marked. Stop and fire when the launcher is aligned.' };
}
