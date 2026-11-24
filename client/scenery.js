import * as T from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { box, cylinder, grainTexture, material, mesh } from './art.js';
import { coastWidth, dockFor, heightAt, OBSTACLES, POINTS, ROADS, seededRandom, smooth, TEAMS, WORLD } from '../shared/map.js';

const BEACH = new T.Color('#c9b994');
const MEADOW = new T.Color('#64714a');
const ROCK = new T.Color('#777568');
const SILT = new T.Color('#315952');
const SUN = new T.Vector3(-.58, .67, -.47).normalize();

export function makeLandscape(scene) {
  scene.fog = new T.FogExp2('#b7c9ca', .00125);
  const sky = new Sky();
  sky.scale.setScalar(1450);
  Object.assign(sky.material.uniforms.turbidity, { value: 3.3 });
  sky.material.uniforms.rayleigh.value = 2.3;
  sky.material.uniforms.mieCoefficient.value = .004;
  sky.material.uniforms.mieDirectionalG.value = .79;
  sky.material.uniforms.sunPosition.value.copy(SUN);
  scene.add(sky);
  scene.add(new T.HemisphereLight('#cbdff7', '#8b8262', 1.63));
  const light = new T.DirectionalLight('#ffe6bc', 3.05);
  light.castShadow = true;
  light.shadow.mapSize.set(1536, 1536);
  light.shadow.camera.left = light.shadow.camera.bottom = -73;
  light.shadow.camera.right = light.shadow.camera.top = 73;
  light.shadow.camera.near = .1;
  light.shadow.camera.far = 230;
  light.shadow.normalBias = .25;
  scene.add(light, light.target);

  addTerrain(scene);
  addRoads(scene);
  addBases(scene);
  scatterVegetation(scene);
  const water = addWater(scene);
  clouds(scene);
  return {
    update(time, aim) {
      water.uniforms.time.value = time;
      light.target.position.set(Math.round(aim.x * .2) * 5, 0, Math.round(aim.z * .2) * 5);
      light.position.copy(light.target.position).addScaledVector(SUN, 110);
    },
  };
}

function addTerrain(scene) {
  const terrain = new T.PlaneGeometry(1250, 1020, 220, 178);
  terrain.rotateX(-Math.PI / 2);
  const positions = terrain.attributes.position;
  const colors = new Float32Array(positions.count * 3);
  const color = new T.Color();
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    const y = heightAt(x, z);
    const variation = Math.sin(x * .058 + z * .045) * Math.sin(z * .071) + .32 * Math.cos(z * .2 - x * .12);
    const slope = Math.hypot(heightAt(x + 3, z) - y, heightAt(x, z + 3) - y);
    color.copy(y < 0 ? SILT : BEACH);
    if (y >= 0) {
      const sand = Math.abs(x) - coastWidth(z) < 36 && Math.abs(z) < 296;
      color.lerp(MEADOW, sand ? smooth(.55, 1.7, y + variation * .3) : .88);
      color.lerp(ROCK, smooth(1.2, 3.6, slope + y * .045));
    }
    color.multiplyScalar(.94 + variation * .12);
    positions.setY(i, y);
    color.toArray(colors, i * 3);
  }
  terrain.setAttribute('color', new T.BufferAttribute(colors, 3));
  terrain.computeVertexNormals();
  const texture = grainTexture();
  texture.repeat.set(96, 83);
  const surface = new T.MeshStandardMaterial({ vertexColors: true, map: texture, bumpMap: texture, bumpScale: .52, roughness: .96 });
  mesh(scene, terrain, surface, 0, 0, 0, false);
}

function ribbons(scene, segments, width, surface, offset) {
  const points = [];
  const uv = [];
  for (const [[x0, z0], [x1, z1]] of segments) {
    const length = Math.hypot(x1 - x0, z1 - z0);
    const steps = Math.max(1, Math.ceil(length / 4));
    const nx = (z0 - z1) * width / (2 * length);
    const nz = (x1 - x0) * width / (2 * length);
    const pair = (i, side) => {
      const progress = i / steps;
      const x = T.MathUtils.lerp(x0, x1, progress) + side * nx;
      const z = T.MathUtils.lerp(z0, z1, progress) + side * nz;
      points.push(x, heightAt(x, z) + offset, z);
      uv.push((side + 1) * .5, progress * length * .16);
    };
    for (let i = 0; i < steps; i++) {
      pair(i, -1); pair(i + 1, -1); pair(i, 1);
      pair(i, 1); pair(i + 1, -1); pair(i + 1, 1);
    }
  }
  const geometry = new T.BufferGeometry();
  geometry.setAttribute('position', new T.Float32BufferAttribute(points, 3));
  geometry.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
  geometry.computeVertexNormals();
  mesh(scene, geometry, surface, 0, 0, 0, false);
}

function addRoads(scene) {
  const texture = grainTexture(99, 96);
  const asphalt = new T.MeshStandardMaterial({ color: '#77776d', map: texture, roughness: .93, side: T.DoubleSide });
  const broad = new T.MeshStandardMaterial({ color: '#a19a79', map: texture, roughness: .91, side: T.DoubleSide });
  const stripes = new T.MeshStandardMaterial({ color: '#e6dac2', roughness: 1, side: T.DoubleSide });
  ribbons(scene, ROADS, 9.4, broad, .07);
  ribbons(scene, ROADS, 7, asphalt, .12);
  const lanes = [];
  for (const [[x0, z0], [x1, z1]] of ROADS) {
    const length = Math.hypot(x1 - x0, z1 - z0);
    for (let n = 4; n < length - 4; n += 12) {
      lanes.push([[T.MathUtils.lerp(x0, x1, n / length), T.MathUtils.lerp(z0, z1, n / length)],
        [T.MathUtils.lerp(x0, x1, (n + 3) / length), T.MathUtils.lerp(z0, z1, (n + 3) / length)]]);
    }
  }
  ribbons(scene, lanes, .16, stripes, .17);
  for (const { side } of TEAMS) {
    const x = side * 253;
    ribbons(scene, [[[x, -145], [x, 145]]], 16.5, asphalt, .14);
    const paint = [[[x - 7.2, -141], [x - 7.2, 141]], [[x + 7.2, -141], [x + 7.2, 141]]];
    for (let z = -127; z < 134; z += 17) paint.push([[x, z], [x, z + 6.3]]);
    for (const end of [-136, 136]) {
      for (let dx = -5; dx <= 5; dx += 2) paint.push([[x + dx, end - 2.5], [x + dx, end + 2.5]]);
    }
    ribbons(scene, paint, .28, stripes, .2);
    const reserve = side * 338;
    ribbons(scene, [[[reserve, 13], [reserve, 66]]], 12.6, broad, .11);
    const bays = [16, 28, 40, 52, 64].map(z => [[reserve - 4.3, z], [reserve + 4.3, z]]);
    ribbons(scene, bays, .20, stripes, .19);
  }
}

function addBases(scene) {
  const panels = material('#7f8174', .28, .71);
  const concrete = material('#a6a58d');
  const dark = material('#363e3a', .3);
  const glass = material('#263f4b', .5, .24);
  for (const b of OBSTACLES) {
    const model = new T.Group();
    model.position.set(b.x, heightAt(b.x, b.z), b.z);
    scene.add(model);
    const team = material(TEAMS[b.team].color, .25);
    box(model, b.w, b.h, b.d, 0, b.h * .5, 0, b.kind === 'bunker' ? concrete : panels);
    box(model, b.w + .45, .28, b.d + .38, 0, b.h + .12, 0, dark);
    if (b.kind === 'bunker') {
      box(model, b.w * .69, .42, .08, 0, b.h * .74, b.d * .5 + .025, glass);
      box(model, b.w * .44, .18, .10, 0, b.h * .52, b.d * .5 + .055, team);
    } else {
      box(model, b.w * .66, b.h * .79, .095, 0, b.h * .416, b.d * .5 + .037, dark);
      for (let x = -b.w * .45; x <= b.w * .46; x += b.kind === 'crate' ? .69 : 1.7) {
        box(model, .09, b.h * .90, .095, x, b.h * .47, b.d * .5 + .085, panels, false);
      }
      box(model, b.w * .52, .29, .11, 0, b.h * .83, b.d * .5 + .101, team, false);
    }
  }
  for (const p of POINTS) {
    const surface = heightAt(p.x, p.z);
    cylinder(scene, 3.4, .12, p.x, surface + .06, p.z, panels, 36);
    cylinder(scene, .16, 7.3, p.x, surface + 3.65, p.z, dark, 14);
    cylinder(scene, .61, .39, p.x, surface + .20, p.z, concrete, 12);
  }
  for (let team = 0; team < 2; team++) {
    const berth = dockFor(team);
    for (const z of [berth.z, -Math.sign(berth.z) * 28]) {
      for (const offset of [-11, 11]) {
        const buoy = cylinder(scene, .52, .77, berth.x * .93, .12, z + offset, material('#d58948'), 12);
        cylinder(buoy, .11, 1.7, 0, 1.03, 0, dark);
        box(buoy, .42, .31, .35, 0, 1.89, 0, material('#f1daa0'));
      }
    }
  }
}

function scatterVegetation(scene) {
  const random = seededRandom(11659);
  const trunk = new T.InstancedMesh(new T.CylinderGeometry(.11, .21, 3.8, 6), material('#59432f'), 510);
  const crown = new T.InstancedMesh(new T.IcosahedronGeometry(1, 1), material('#596f46'), 1020);
  const stone = new T.InstancedMesh(new T.DodecahedronGeometry(1, 0), material('#8c8673'), 410);
  const tuft = new T.InstancedMesh(new T.ConeGeometry(.39, 1, 4, 1, true), material('#8c925e'), 1300);
  const matrix = new T.Object3D();
  const color = new T.Color();
  let trees = 0;
  let rocks = 0;
  let grass = 0;
  const safe = (x, z, r) => (Math.abs(Math.abs(x) - 338) > 8 + r || z < 11 - r || z > 67 + r)
    && Math.abs(Math.abs(x) - 253) > 13 + r
    && Math.abs(Math.abs(x) - 351) > 5 + r && Math.abs(z) > 7 + r && Math.abs(Math.abs(z) - 326) > 6 + r
    && POINTS.every(p => Math.hypot(p.x - x, p.z - z) > 26 + r)
    && OBSTACLES.every(o => Math.abs(o.x - x) > o.w * .5 + r || Math.abs(o.z - z) > o.d * .5 + r);
  const place = (collection, index, x, y, z, sx, sy, sz, shade) => {
    matrix.position.set(x, y, z);
    matrix.rotation.set(.09 * (random() - .5), random() * Math.PI * 2, .09 * (random() - .5));
    matrix.scale.set(sx, sy, sz);
    matrix.updateMatrix();
    collection.setMatrixAt(index, matrix.matrix);
    collection.setColorAt(index, color.setScalar(shade));
  };
  for (let i = 0; i < 9000 && (trees < 510 || rocks < 410 || grass < 1300); i++) {
    const x = (random() * 2 - 1) * 550;
    const z = (random() * 2 - 1) * 435;
    const y = heightAt(x, z);
    if (y < .22 || !safe(x, z, 1.7)) continue;
    const size = .66 + random() * .95;
    if (trees < 510 && y > 2.2 && random() > .43 && (Math.sin(x * .09) + Math.cos(z * .08)) > -.36) {
      place(trunk, trees, x, y + 1.8 * size, z, size, size, size, .83 + random() * .25);
      place(crown, trees * 2, x, y + size * 4.25, z, size * 1.37, size * 2.11, size * 1.52, .68 + random() * .49);
      place(crown, trees * 2 + 1, x + .46 * size, y + size * 3.5, z - .48 * size, size * 1.35, size * 1.35, size * 1.31, .76 + random() * .34);
      trees++;
    } else if (rocks < 410 && random() > .74) {
      place(stone, rocks++, x, y + size * .20, z, size * 1.3, size * .58, size, .75 + random() * .36);
    } else if (grass < 1300) {
      place(tuft, grass++, x, y + size * .39, z, size, size * .8, size, .72 + random() * .45);
    }
  }
  trunk.count = trees;
  crown.count = trees * 2;
  stone.count = rocks;
  tuft.count = grass;
  for (const part of [trunk, crown, stone, tuft]) {
    part.castShadow = part !== tuft;
    part.receiveShadow = true;
    scene.add(part);
  }
}

function addWater(scene) {
  const w = 256;
  const h = 192;
  const data = new Uint8Array(w * h);
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const y = heightAt((i / (w - 1) * 2 - 1) * WORLD.x, (j / (h - 1) * 2 - 1) * WORLD.z);
      data[j * w + i] = Math.round(T.MathUtils.clamp(-y / 16, 0, 1) * 255);
    }
  }
  const depth = new T.DataTexture(data, w, h, T.RedFormat);
  depth.magFilter = depth.minFilter = T.LinearFilter;
  depth.needsUpdate = true;
  const geometry = new T.PlaneGeometry(1156, 865, 184, 138);
  geometry.rotateX(-Math.PI / 2);
  const surface = new T.ShaderMaterial({
    uniforms: { time: { value: 0 }, bathymetry: { value: depth }, sun: { value: SUN } },
    vertexShader: `
      uniform float time;
      varying vec3 wp;
      varying float swell;
      void main() {
        wp = position;
        swell = .22 * sin(dot(wp.xz,vec2(.115,.067)) - time * 1.24)
              + .13 * sin(dot(wp.xz,vec2(-.078,.167)) - time * 1.61)
              + .043 * sin(dot(wp.xz,vec2(.28,-.14)) - time * 2.12);
        wp.y += swell;
        gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.);
      }`,
    fragmentShader: `
      uniform float time;
      uniform vec3 sun;
      uniform sampler2D bathymetry;
      varying vec3 wp;
      varying float swell;
      float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453); }
      float waterNoise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 t = f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1.,0.)),t.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),t.x),t.y);
      }
      void main() {
        vec2 water = wp.xz;
        vec3 ray = cameraPosition - wp;
        float distanceToEye = length(ray);
        vec3 eye = normalize(ray);
        float detail = 1. - smoothstep(40.,320.,distanceToEye);
        float a = dot(water,vec2(.115,.067)) - time*1.24;
        float b = dot(water,vec2(-.078,.167)) - time*1.61;
        float c = dot(water,vec2(.55,.31)) - time*2.8;
        float chop = waterNoise(water*.108 - vec2(time*.055,time*.029));
        vec2 slope = vec2(.045,.025)*cos(a) + vec2(-.026,.041)*cos(b)
          + vec2(.062,.04)*cos(c + chop*3.);
        slope += detail * (vec2(.094,-.043)*cos(dot(water,vec2(1.9,-.8))-time*3.4)
          + vec2(.044,.086)*cos(dot(water,vec2(.79,2.77))-time*4.1));
        vec3 normal = normalize(vec3(-slope.x,1.,-slope.y));
        vec2 mapUV = water / vec2(${WORLD.x * 2}.0, ${WORLD.z * 2}.0) + .5;
        float depth = texture2D(bathymetry,mapUV + normal.xz*.0016).r;
        float fresnel = .025 + .975 * pow(1. - max(0.,dot(normal,eye)),5.);
        vec3 reflected = reflect(-eye, normal);
        float sky = smoothstep(-.06,.58,reflected.y);
        vec3 reflection = mix(vec3(.48,.59,.64),vec3(.126,.326,.56),sky);
        float cloud = waterNoise(reflected.xz*6.9 / max(.29,reflected.y+.31));
        reflection = mix(reflection,vec3(.74,.77,.75),smoothstep(.57,.85,cloud)*.57);
        vec3 bottom = mix(vec3(.30,.37,.228),vec3(.039,.27,.229),smoothstep(0.,.17,depth));
        vec3 tint = mix(bottom,vec3(.012,.075,.12),1.-exp(-depth*5.8));
        float glint = pow(max(0.,dot(reflected,sun)), 105.) * 1.65;
        float sandLight = detail * (1.-smoothstep(.015,.20,depth)) * (.014*cos(c*2.+b) + .014);
        vec3 color = mix(tint + sandLight,reflection,min(.94,fresnel+.13)) + glint*vec3(1.,.86,.67);
        float lace = waterNoise(water*.72 + vec2(time*.18,-time*.12));
        float wash = sin(depth*119.-time*2.6+chop*7.+swell*2.);
        float surf = (smoothstep(.58,.91,wash+lace*.37) * .64
          + smoothstep(.50,.75,lace) * (1.-smoothstep(.005,.05,depth))*.46)
          * (1.-smoothstep(.016,.117,depth));
        float crests = smoothstep(.27,.38,swell+chop*.09)*smoothstep(.66,.85,lace);
        color = mix(color,vec3(.70,.83,.81),min(.79,surf+crests*.20));
        float fog = 1. - exp(-.00000150 * dot(ray,ray));
        gl_FragColor = vec4(mix(color,vec3(.47,.56,.57),fog),1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const sea = mesh(scene, geometry, surface, 0, 0, 0, false);
  sea.receiveShadow = false;
  return surface;
}

function clouds(scene) {
  const geometry = new T.PlaneGeometry(2500, 2500);
  geometry.rotateX(Math.PI / 2);
  const shader = new T.ShaderMaterial({
    transparent: true, depthWrite: false, side: T.DoubleSide,
    vertexShader: `
      varying vec3 wp;
      void main() {
        wp = (modelMatrix * vec4(position, 1.)).xyz;
        gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.);
      }`,
    fragmentShader: `
      varying vec3 wp;
      float hash(vec2 u) { return fract(sin(dot(u,vec2(79.1,211.9)))*4375.64); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
          mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
      }
      void main() {
        vec2 u = wp.xz * .007;
        float cv = noise(u)*.55 + noise(u*2.17)*.25 + noise(u*4.7)*.12 + noise(u*10.43)*.07;
        float opacity = smoothstep(.55,.74,cv) * .68 * (1. - smoothstep(670.,1220.,length(wp.xz)));
        gl_FragColor = vec4(mix(vec3(.68,.73,.76),vec3(.97,.95,.90), smoothstep(.54,.82,cv)), opacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  mesh(scene, geometry, shader, 0, 223, 0, false);
}
