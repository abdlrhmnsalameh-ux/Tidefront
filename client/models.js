import * as T from 'three';
import { box, cylinder, material, mesh, outline, sphere } from './art.js';
import { DECK } from '../shared/rules.js';
import { TEAMS } from '../shared/map.js';

const RUBBER = material('#202622', .05, .97);
const STEEL = material('#414b48', .48, .65);
const EDGE = material('#6b7264', .51, .62);
const BLACK = material('#202c2e', .31, .74);
const GLASS = material('#263f49', .47, .22);
const PARCHMENT = material('#dfd6b7', .08);
const WOOD = material('#795b42', .08, .59);
const LAMPS = [material('#e9deb6', .2, .37), material('#a94e42', .15, .48)];
const PAINT = [material('#606d57', .33, .69), material('#8b7758', .33, .72)];
const CLOTH = [material('#576956'), material('#847359')];
const BANDS = TEAMS.map(t => material(t.color, .14, .57));

function barrel(parent, radius, length, x, y, z, surface = STEEL, segments = 12) {
  const node = cylinder(parent, radius, length, x, y, z, surface, segments);
  node.rotation.x = Math.PI / 2;
  return node;
}

function axle(parent, radius, x, y, z, wide, armored = false) {
  const tire = cylinder(parent, radius, wide, x, y, z, RUBBER, 16);
  tire.rotation.z = Math.PI * .5;
  const rim = cylinder(parent, radius * .67, wide + .024, x, y, z, armored ? STEEL : EDGE, 12);
  rim.rotation.z = Math.PI * .5;
  const hub = cylinder(parent, radius * .28, wide + .038, x, y, z, BLACK, 8);
  hub.rotation.z = Math.PI * .5;
  return tire;
}

function antenna(parent, x, y, z, length) {
  cylinder(parent, .024, length, x, y + length / 2, z, BLACK, 6).rotation.z = -.065;
}

function mount(root, y, z = 0) {
  const turret = new T.Group();
  const gun = new T.Group();
  turret.position.set(0, y, z);
  root.add(turret);
  turret.add(gun);
  return { turret, gun };
}

export function vehicleModel(type, team) {
  const root = new T.Group();
  const paint = PAINT[team];
  const band = BANDS[team];
  const setup = { root, turret: null, gun: null, wheels: [], ramp: null, gear: null, wake: null };
  if (type === 'recon') {
    const body = outline(root, [[-1.07,-2.43],[-1.32,-1.93],[-1.32,2.05],[-.94,2.41],
      [.94,2.41],[1.32,2.05],[1.32,-1.93],[1.07,-2.43]], .69, -.34, paint);
    body.receiveShadow = true;
    box(root, 2.22, .47, 1.24, 0, .41, -1.48, paint);
    box(root, 2.22, .64, 1.65, 0, .55, -.10, paint);
    box(root, 1.98, .48, .09, 0, .68, -.934, GLASS).rotation.x = -.17;
    box(root, 2.24, .12, 1.83, 0, .893, -.13, STEEL);
    for (const s of [-1, 1]) {
      box(root, .12, .39, 1.18, s * 1.12, .63, -.1, GLASS);
      box(root, .20, .44, .84, s * 1.17, .13, 1.55, BLACK);
      box(root, .48, .20, .07, s * .81, .18, -2.405, LAMPS[0]);
      box(root, .27, .17, .09, s * .86, .115, 2.398, LAMPS[1]);
      box(root, .05, .25, .53, s * 1.344, .24, -.1, band);
      for (const z of [-1.56, 1.69]) setup.wheels.push(axle(root, .56, s * 1.22, -.384, z, .41));
    }
    box(root, 2.28, .18, .29, 0, -.29, -2.54, BLACK);
    box(root, 1.59, .36, .63, 0, .27, 1.62, STEEL);
    Object.assign(setup, mount(root, 1.01, .25));
    cylinder(setup.turret, .29, .16, 0, .025, 0, EDGE);
    box(setup.gun, .24, .21, .86, 0, .22, -.28, BLACK);
    barrel(setup.gun, .062, .78, 0, .22, -.91);
    antenna(root, 1.06, .67, 1.84, 1.65);
  } else if (type === 'tank') {
    outline(root, [[-1.44,-2.85],[-1.07,-3.37],[1.07,-3.37],[1.44,-2.85],
      [1.44,3.02],[-1.44,3.02]], .87, -.53, paint);
    outline(root, [[-1.27,-2.44],[-.91,-2.98],[.91,-2.98],[1.27,-2.44],
      [1.2,.36],[-1.2,.36]], .23, .35, paint);
    setup.treads = [];
    for (const s of [-1, 1]) {
      box(root, .72, 1.01, 6.25, s * 1.46, -.60, .03, RUBBER);
      for (let z = -2.54; z < 2.7; z += .87) setup.wheels.push(axle(root, .439, s * 1.49, -.63, z, .66, true));
      box(root, .66, .16, 6.31, s * 1.49, -.06, .012, STEEL);
      for (let i = 0; i < 27; i++) {
        const link = box(root, .74, .069, .24, s * 1.48, -.07, 0, EDGE, false);
        setup.treads.push({ link, offset: i / 27 * 14 });
      }
      box(root, .11, .21, .83, s * 1.48, .21, .35, band);
    }
    for (let z = 1.67; z < 2.84; z += .21) box(root, 1.65, .071, .069, 0, .386, z, STEEL, false);
    Object.assign(setup, mount(root, .55, .03));
    outline(setup.turret, [[-1.23,-.48],[-.76,-1.13],[.76,-1.13],[1.28,-.65],
      [1.26,1.11],[-1,1.19],[-1.28,.67]], .72, -.03, paint, .13);
    cylinder(setup.turret, .48, .07, -.43, .82, .27, STEEL, 16);
    box(setup.turret, .56, .24, .411, .44, .81, -.12, GLASS);
    box(setup.gun, .55, .43, .81, 0, .31, -.94, STEEL);
    barrel(setup.gun, .132, 2.94, 0, .32, -2.34);
    barrel(setup.gun, .182, .24, 0, .32, -3.78, BLACK);
    barrel(setup.gun, .062, 1.1, .57, .37, -1.62, STEEL);
    antenna(setup.turret, -.87, .69, .84, 2.1);
    antenna(setup.turret, .83, .67, .86, 1.47);
  } else if (type === 'launcher' || type === 'ballistic') {
    const meridian = type === 'ballistic';
    box(root, 2.84, .57, 7.22, 0, -.53, 0, STEEL);
    box(root, 2.91, 1.46, 2.14, 0, .16, -2.24, paint);
    box(root, 2.52, .60, .077, 0, .49, -3.339, GLASS);
    box(root, 2.97, .10, 2.28, 0, .91, -2.21, PAINT[team]);
    box(root, 2.62, .23, .29, 0, -.38, -3.50, BLACK);
    for (const s of [-1, 1]) {
      box(root, .072, .46, .95, s * 1.474, .46, -2.4, GLASS);
      box(root, .43, .28, .075, s * 1.0, -.16, -3.34, LAMPS[0]);
      box(root, .085, .22, .85, s * 1.49, -.16, .15, band);
      for (const z of [-2.42, -.23, 2.02, 2.92]) setup.wheels.push(axle(root, .64, s * 1.44, -.71, z, .39));
    }
    Object.assign(setup, mount(root, .52, .94));
    cylinder(setup.turret, .77, .26, 0, -.03, 0, STEEL);
    if (meridian) {
      box(setup.gun, 2.48, .20, 4.18, 0, .16, .00, STEEL);
      for (const x of [-.59,.59]) {
        barrel(setup.gun, .43, 4.25, x, .67, .10, paint, 16);
        for (const z of [-1.92, -.73, .94, 2.12]) barrel(setup.gun, .475, .14, x, .67, z, EDGE, 16);
        barrel(setup.gun, .34, .05, x, .67, -2.08, BLACK);
      }
    } else {
      box(setup.gun, 2.54, 1.15, 3.52, 0, .43, .09, paint);
      for (const y of [.16, .62, .88]) {
        for (const x of [-.86,-.44,0,.44,.86]) {
          barrel(setup.gun, .128, .075, x, y, -1.704, BLACK, 8);
          barrel(setup.gun, .14, .081, x, y, 1.87, STEEL, 8);
        }
      }
    }
    antenna(root, 1.28, .87, -1.69, 1.87);
  } else if (type === 'jet') {
    const alloy = material(team === 0 ? '#788b91' : '#939083', .47, .46);
    outline(root, [[0,-6.49],[-.56,-4.83],[-1.27,-1.57],[-1.28,4.34],[-.81,5.82],
      [.81,5.82],[1.28,4.34],[1.27,-1.57],[.56,-4.83]], .68, -.34, alloy);
    outline(root, [[0,-5.99],[-.43,-3.5],[-.64,-1.56],[-.92,3.42],[-.53,4.92],
      [.53,4.92],[.92,3.42],[.64,-1.56],[.43,-3.5]], .31, .315, alloy, .14);
    sphere(root, 1, 0, .65, -2.51, GLASS, .56, .48, 1.38);
    for (const s of [-1, 1]) {
      outline(root, [[s * .91,-2.33],[s * 4.25,1.5],[s * 4.03,3.03],
        [s * 1.28,2.22]], .14, -.075, alloy, .035);
      outline(root, [[s * .69,3.01],[s * 2.35,4.73],[s * 2.22,5.55],
        [s * .72,5.30]], .105, .04, alloy, .029);
      cylinder(root, .19, 1.7, s * .77, .94, 4.56, alloy, 6).rotation.x = -.55;
      barrel(root, .35, .61, s * .49, -.02, 5.78, BLACK);
      box(root, .42, .044, .62, s * 3.04, .112, 1.84, band);
      barrel(root, .125, 1.84, s * 2.49, -.27, 1.12, PARCHMENT, 8);
      box(root, .17, .30, .52, s * 2.49, -.13, 1.32, STEEL);
    }
    const gear = new T.Group();
    root.add(gear);
    for (const [x, z] of [[0,-3.35],[-1.2,1.65],[1.2,1.65]]) {
      cylinder(gear, .079, .73, x, -.66, z, EDGE, 8);
      axle(gear, .32, x, -.916, z, .22);
    }
    setup.gear = gear;
  } else if (type === 'transport') {
    const deck = material('#747c70', .22, .71);
    const hull = material('#546468', .30, .64);
    const footprint = [[-7.22,14],[-7.22,-8],[-5.33,-13.68],[0,-17.2],
      [5.33,-13.68],[7.22,-8],[7.22,14]];
    outline(root, footprint, 2.76, -1.38, hull, .08);
    outline(root, footprint, .095, DECK.y - .095, deck, 0);
    outline(root, footprint.map(([x, z]) => [x * 1.008, z]), .37, -.72, material('#6e5043', .17, .75), 0);
    for (const s of [-1, 1]) {
      box(root, .63, 1.17, 23.68, s * 6.94, 1.98, 1.94, hull);
      box(root, .24, .14, 23.56, s * 6.94, 2.61, 1.94, EDGE);
      box(root, .105, .026, 22.73, s * 5.8, DECK.y + .019, 1.72, PARCHMENT, false);
      for (let z = -7; z <= 12; z += 3.8) {
        box(root, .27, .63, .31, s * 6.69, 1.79, z, BLACK);
        box(root, .074, .14, .87, s * 7.29, 1.41, z, band, false);
      }
    }
    box(root, 9.12, 2.52, 4.83, 0, 2.71, -11.2, hull);
    box(root, 7.58, 1.34, 3.51, 0, 4.55, -11.29, hull);
    box(root, 7.37, .66, .083, 0, 4.63, -9.51, GLASS);
    box(root, 7.41, .66, .083, 0, 4.63, -13.065, GLASS);
    box(root, 8.01, .17, 3.83, 0, 5.25, -11.29, STEEL);
    for (const x of [-2.7, -1.34, 0, 1.34, 2.7]) box(root, .10, .80, .10, x, 4.57, -9.441, hull, false);
    antenna(root, -1.6, 5.3, -11.8, 3.41);
    antenna(root, 1.7, 5.3, -11.4, 2.98);
    box(root, 3.4, .22, .37, .73, 6.26, -11.6, EDGE);
    Object.assign(setup, mount(root, 2.01, -7.58));
    cylinder(setup.turret, .42, .30, 0, .03, 0, STEEL);
    barrel(setup.gun, .12, 1.3, 0, .27, -.73, BLACK);
    const ramp = new T.Group();
    ramp.position.set(0, DECK.y, DECK.stern);
    root.add(ramp);
    box(ramp, 12.58, .23, DECK.ramp, 0, -.12, DECK.ramp / 2, deck);
    for (let z = .48; z < DECK.ramp; z += 1.12) {
      box(ramp, 12.62, .036, .079, 0, .016, z, EDGE, false);
    }
    for (const x of [-5.86, 5.86]) box(ramp, .088, .023, DECK.ramp - .16, x, .034, DECK.ramp / 2, PARCHMENT, false);
    setup.ramp = ramp;
    const wake = new T.Mesh(
      new T.PlaneGeometry(30, 64).rotateX(-Math.PI / 2),
      new T.ShaderMaterial({
        transparent: true, depthWrite: false, uniforms: { phase: { value: 0 }, strength: { value: 0 } },
        vertexShader: 'varying vec2 tex; void main(){ tex = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
        fragmentShader: `varying vec2 tex; uniform float phase, strength;
          void main(){ float x=abs(tex.x-.5), y=tex.y;
            float edge=max(0.,1.-abs(x-(.12+.33*(1.-y)))*27.);
            float streak=max(0.,1.-x*9.)*.31;
            float ripple=.42+.58*sin(y*89.+sin(x*99.)*1.9+phase)*sin(y*89.+sin(x*99.)*1.9+phase);
            gl_FragColor=vec4(.83,.94,.93,(edge+streak)*ripple*y*strength); }`,
      }),
    );
    wake.position.set(0, -.1, 41);
    root.add(wake);
    setup.wake = wake;
  }
  return setup;
}

function rifle(parent, rocket = false) {
  if (rocket) {
    const tube = barrel(parent, .071, 1.01, 0, .024, -.30, STEEL);
    barrel(parent, .092, .11, 0, .024, -.83, BLACK);
    box(parent, .075, .15, .13, 0, -.069, -.22, WOOD);
    box(parent, .10, .091, .33, 0, .026, -.107, WOOD);
    box(parent, .05, .071, .08, -.074, .132, -.38, BLACK);
    return tube;
  }
  box(parent, .076, .092, .36, 0, .012, -.235, STEEL);
  box(parent, .079, .098, .207, 0, .009, -.454, WOOD);
  barrel(parent, .024, .319, 0, .027, -.65, BLACK);
  box(parent, .036, .072, .037, 0, .073, -.76, STEEL);
  box(parent, .081, .159, .11, 0, -.117, -.26, BLACK).rotation.x = -.36;
  box(parent, .061, .145, .072, 0, -.078, -.073, WOOD).rotation.x = .21;
  box(parent, .076, .084, .28, 0, -.009, .053, WOOD).rotation.x = -.11;
}

export function soldierModel(team) {
  const root = new T.Group();
  const top = new T.Group();
  root.add(top);
  const cloth = CLOTH[team];
  const joint = material('#494840');
  const face = material(team === 0 ? '#9b765b' : '#9a6d51');
  const band = BANDS[team];
  outline(top, [[-.19,-.095],[.19,-.095],[.21,.09],[-.21,.09]], .43, -.12, cloth, .03);
  box(top, .335, .305, .16, 0, .095, -.10, joint);
  box(top, .305, .35, .17, 0, .119, .126, cloth);
  for (const x of [-.11, 0, .11]) box(top, .084, .151, .055, x, .064, -.196, PAINT[team]);
  sphere(top, .128, 0, .455, -.014, face, .85, 1.18, .92);
  sphere(top, .167, 0, .514, -.012, PAINT[team], .93, .76, .99);
  box(top, .222, .05, .082, 0, .486, -.103, GLASS);
  box(top, .203, .020, .081, 0, .512, -.122, joint);
  const legs = [-1, 1].map(s => {
    const leg = new T.Group();
    leg.position.set(s * .106, -.132, 0);
    root.add(leg);
    box(leg, .172, .40, .165, 0, -.198, 0, cloth);
    box(leg, .147, .279, .141, 0, -.505, 0, joint);
    box(leg, .158, .104, .247, 0, -.688, -.049, RUBBER);
    return leg;
  });
  const arms = new T.Group();
  top.add(arms);
  for (const s of [-1, 1]) {
    box(arms, .140, .258, .15, s * .237, .073, -.066, cloth).rotation.x = .58;
    box(arms, .129, .13, .295, s * .219, -.017, -.213, joint).rotation.y = s * .21;
    box(arms, .124, .070, .108, s * .263, .165, -.062, band);
    sphere(arms, .060, s * .164, -.017, -.347, RUBBER, 1.02, .85, 1.16);
  }
  const gun = new T.Group();
  gun.position.set(.114, .018, -.331);
  rifle(gun);
  arms.add(gun);
  return { root, legs, arms };
}

export function viewWeapon(kind) {
  const handheld = new T.Group();
  const gloves = material('#41463c');
  const grip = kind === 'rocket' ? .15 : .06;
  for (const s of [-1, 1]) {
    const wrist = box(handheld, .15, .13, .44, s * .125, -.088, -.05 - s * .17, gloves);
    wrist.rotation.y = s * .34;
    sphere(handheld, .08, s * (grip + .039), -.044, -.234 - s * .151, RUBBER);
  }
  rifle(handheld, kind === 'rocket');
  handheld.traverse(node => { if (node.isMesh) node.castShadow = false; });
  return handheld;
}
