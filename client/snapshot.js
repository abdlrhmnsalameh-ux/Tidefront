export function unpack(state) {
  const players = state.players.map(([id, team, name, x, y, z, yaw, pitch, hp, vehicle, respawn,
    human, kills, deaths, score, slot, rifle, rocket, reload, speed, swim, nearby]) =>
    ({ id, team, name, x, y, z, yaw, pitch, hp, vehicle, respawn, human, kills, deaths, score,
      slot, rifle, rocket, reload, speed, swim, nearby }));
  const vehicles = state.vehicles.map(([id, type, team, x, y, z, yaw, pitch, hp, driver, dead, turret,
    roll, speed, airborne, ramp, berth, aimPitch, cargo, recoil, target, weaponReadyAt]) =>
    ({ id, type, team, x, y, z, yaw, pitch, hp, driver, dead, turret, roll, speed, airborne,
      ramp, berth, aimPitch, cargo, recoil, target, weaponReadyAt }));
  return { ...state, players, vehicles };
}
