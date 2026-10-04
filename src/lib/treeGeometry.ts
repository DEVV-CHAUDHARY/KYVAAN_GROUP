/* ============================================================
   KYVAAN — procedural tree geometry
   ------------------------------------------------------------
   Generated once at module load from a fixed seed, so the tree
   is identical on every visit: a stable monument, not noise.

   Art direction
   · Buttressed trunk with a slight organic lean — never a pole
   · Bark built from striations, lenticels and knot shadows
   · Six project limbs, each a distinct asymmetric path
   · Foliage in four depth layers: shadow, mid, lit, highlight
   · Directional warm light from the upper left, KYVAAN palette
   ============================================================ */

export const VIEW_W = 1000;
export const VIEW_H = 800;
export const GROUND = 736;

type P = [number, number];
export type Curve = { p0: P; p1: P; p2: P; p3: P };

/* ---------- deterministic PRNG ---------- */
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- curve maths ---------- */
const at = (c: Curve, t: number): P => {
  const u = 1 - t;
  return [
    u * u * u * c.p0[0] + 3 * u * u * t * c.p1[0] + 3 * u * t * t * c.p2[0] + t * t * t * c.p3[0],
    u * u * u * c.p0[1] + 3 * u * u * t * c.p1[1] + 3 * u * t * t * c.p2[1] + t * t * t * c.p3[1],
  ];
};

const tangent = (c: Curve, t: number): number => {
  const u = 1 - t;
  const dx =
    3 * u * u * (c.p1[0] - c.p0[0]) +
    6 * u * t * (c.p2[0] - c.p1[0]) +
    3 * t * t * (c.p3[0] - c.p2[0]);
  const dy =
    3 * u * u * (c.p1[1] - c.p0[1]) +
    6 * u * t * (c.p2[1] - c.p1[1]) +
    3 * t * t * (c.p3[1] - c.p2[1]);
  return Math.atan2(dy, dx);
};

const f = (n: number) => Math.round(n * 10) / 10;

/** Tapered, filled outline of a curve — gives limbs organic mass. */
function taper(c: Curve, w0: number, w1: number, steps = 16, flare = 0.72): string {
  const L: P[] = [];
  const R: P[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const [x, y] = at(c, t);
    const a = tangent(c, t) + Math.PI / 2;
    const w = (w0 + (w1 - w0) * Math.pow(t, flare)) / 2;
    L.push([x + Math.cos(a) * w, y + Math.sin(a) * w]);
    R.push([x - Math.cos(a) * w, y - Math.sin(a) * w]);
  }
  let d = `M${f(L[0][0])} ${f(L[0][1])}`;
  for (let i = 1; i < L.length; i++) d += `L${f(L[i][0])} ${f(L[i][1])}`;
  for (let i = R.length - 1; i >= 0; i--) d += `L${f(R[i][0])} ${f(R[i][1])}`;
  return d + "Z";
}

function makeCurve(x: number, y: number, ang: number, len: number, curl: number): Curve {
  const ex = x + Math.cos(ang) * len;
  const ey = y + Math.sin(ang) * len;
  const a2 = ang + curl;
  return {
    p0: [x, y],
    p1: [x + Math.cos(ang) * len * 0.34, y + Math.sin(ang) * len * 0.34],
    p2: [ex - Math.cos(a2) * len * 0.34, ey - Math.sin(a2) * len * 0.34],
    p3: [ex, ey],
  };
}

const span = (c: Curve) => Math.hypot(c.p3[0] - c.p0[0], c.p3[1] - c.p0[1]);

/* ============================================================
   TRUNK — buttressed, leaning, irregular
   ============================================================ */

/** Outer silhouette: asymmetric bulges and buttress flares. */
export const TRUNK_D = (() => {
  const L: P[] = [
    [418, GROUND], [440, 716], [452, 690], [446, 652],
    [456, 610], [462, 560], [470, 508], [476, 462], [482, 424],
  ];
  const R: P[] = [
    [588, GROUND], [566, 714], [556, 686], [562, 646],
    [552, 604], [546, 554], [536, 502], [528, 456], [520, 420],
  ];
  // crown of the trunk splits into the leader
  let d = `M${f(L[0][0])} ${f(L[0][1])}`;
  for (let i = 1; i < L.length; i++) d += `L${f(L[i][0])} ${f(L[i][1])}`;
  d += `C486 400 494 388 500 372C506 388 514 400 520 420`;
  for (let i = R.length - 1; i >= 0; i--) d += `L${f(R[i][0])} ${f(R[i][1])}`;
  return d + "Z";
})();

/** Buttress flares where the trunk meets the ground. */
export const BUTTRESS_D = [
  taper({ p0: [436, GROUND - 4], p1: [404, GROUND - 2], p2: [372, GROUND + 6], p3: [340, GROUND + 16] }, 46, 4, 8, 0.5),
  taper({ p0: [570, GROUND - 4], p1: [602, GROUND - 2], p2: [634, GROUND + 6], p3: [666, GROUND + 16] }, 46, 4, 8, 0.5),
  taper({ p0: [466, GROUND - 2], p1: [452, GROUND + 8], p2: [440, GROUND + 20], p3: [424, GROUND + 30] }, 34, 3, 8, 0.5),
  taper({ p0: [540, GROUND - 2], p1: [554, GROUND + 8], p2: [566, GROUND + 20], p3: [582, GROUND + 30] }, 34, 3, 8, 0.5),
];

/** Bark striations — vertical grain that follows the trunk lean. */
export const BARK_D: string[] = (() => {
  const out: string[] = [];
  for (let i = 0; i < 13; i++) {
    const o = -58 + i * 9.4;
    const top = 424 + Math.abs(o) * 0.22;
    out.push(
      `M${f(502 + o * 1.05)} ${GROUND - 20} C${f(492 + o * 0.96)} 690 ${f(506 + o * 0.7)} 560 ${f(
        500 + o * 0.4
      )} ${f(top)}`
    );
  }
  return out;
})();

/** Lenticels — short horizontal dashes that break up the grain. */
export const LENTICELS: { x: number; y: number; w: number }[] = (() => {
  const r = mulberry32(9182);
  const out: { x: number; y: number; w: number }[] = [];
  for (let i = 0; i < 34; i++) {
    const y = 448 + r() * 268;
    const halfW = 74 - ((y - 424) / 312) * 46;
    out.push({ x: 500 + (r() - 0.5) * 2 * halfW, y, w: 4 + r() * 11 });
  }
  return out;
})();

/** Knot / burl shadows for material interest. */
export const KNOTS: { x: number; y: number; r: number }[] = [
  { x: 468, y: 646, r: 11 },
  { x: 534, y: 588, r: 8 },
  { x: 486, y: 512, r: 6.5 },
];

/** Central leader rising from the crown. */
export const LEADER_D = taper(
  { p0: [500, 396], p1: [494, 330], p2: [504, 268], p3: [498, 196] },
  26, 9, 14
);

/* ============================================================
   ROOTS — visible but elegant: foundation, vision, values
   ============================================================ */
export const ROOT_D = [
  taper({ p0: [452, GROUND - 16], p1: [404, GROUND - 14], p2: [356, GROUND - 2], p3: [300, GROUND + 16] }, 30, 2, 10, 0.55),
  taper({ p0: [554, GROUND - 16], p1: [602, GROUND - 14], p2: [650, GROUND - 2], p3: [706, GROUND + 16] }, 30, 2, 10, 0.55),
  taper({ p0: [470, GROUND - 12], p1: [444, GROUND], p2: [414, GROUND + 12], p3: [378, GROUND + 26] }, 22, 1.5, 10, 0.55),
  taper({ p0: [536, GROUND - 12], p1: [562, GROUND], p2: [592, GROUND + 12], p3: [628, GROUND + 26] }, 22, 1.5, 10, 0.55),
  taper({ p0: [492, GROUND - 10], p1: [482, GROUND + 4], p2: [470, GROUND + 16], p3: [452, GROUND + 30] }, 16, 1.2, 9, 0.55),
  taper({ p0: [512, GROUND - 10], p1: [522, GROUND + 4], p2: [534, GROUND + 16], p3: [552, GROUND + 30] }, 16, 1.2, 9, 0.55),
];

/* ============================================================
   SIX PROJECT LIMBS — distinct asymmetric paths
   ============================================================ */
type LimbDef = { c: Curve; side: "left" | "right"; w: number };

const PROJECT_CURVES: LimbDef[] = [
  // 01 — lowest right, heaviest
  { side: "right", w: 30, c: { p0: [556, 648], p1: [648, 646], p2: [762, 588], p3: [866, 470] } },
  // 02 — lowest left, heaviest
  { side: "left", w: 30, c: { p0: [446, 614], p1: [352, 610], p2: [240, 552], p3: [138, 438] } },
  // 03 — mid right
  { side: "right", w: 25, c: { p0: [548, 566], p1: [636, 544], p2: [744, 452], p3: [824, 330] } },
  // 04 — mid left
  { side: "left", w: 25, c: { p0: [454, 530], p1: [366, 508], p2: [262, 414], p3: [186, 292] } },
  // 05 — upper right
  { side: "right", w: 20, c: { p0: [532, 484], p1: [596, 434], p2: [672, 322], p3: [708, 194] } },
  // 06 — upper left
  { side: "left", w: 20, c: { p0: [470, 456], p1: [416, 402], p2: [344, 284], p3: [306, 156] } },
];

/** Secondary limbs — mass and silhouette, not interactive. */
const FILLER_CURVES: { c: Curve; w: number }[] = [
  { w: 19, c: { p0: [560, 682], p1: [630, 678], p2: [700, 650], p3: [748, 602] } },
  { w: 19, c: { p0: [442, 660], p1: [372, 656], p2: [306, 628], p3: [258, 580] } },
  { w: 17, c: { p0: [552, 604], p1: [620, 580], p2: [686, 520], p3: [728, 450] } },
  { w: 17, c: { p0: [450, 574], p1: [384, 552], p2: [320, 492], p3: [280, 426] } },
  { w: 15, c: { p0: [544, 520], p1: [598, 490], p2: [654, 418], p3: [680, 340] } },
  { w: 15, c: { p0: [458, 494], p1: [406, 462], p2: [354, 392], p3: [330, 316] } },
  { w: 16, c: { p0: [522, 450], p1: [556, 388], p2: [586, 302], p3: [592, 220] } },
  { w: 16, c: { p0: [480, 450], p1: [446, 388], p2: [416, 302], p3: [410, 220] } },
  { w: 13, c: { p0: [502, 444], p1: [504, 364], p2: [502, 288], p3: [500, 210] } },
];

/* ============================================================
   GENERATION
   ============================================================ */
export type Limb = { d: string; depth: number; owner: number; lit: boolean };
export type Leaf = { x: number; y: number; r: number; s: number; c: string; o: number; l: number };
export type Mass = { x: number; y: number; rx: number; ry: number; l: number };

/* Foliage palette — muted, natural, KYVAAN-compatible. Never aggressive green. */
const DEEP = ["#3d4335", "#444a3b", "#3a4033"];
const MID = ["#5c6350", "#666d57", "#565d49"];
const LIT = ["#7d8469", "#8a9077", "#717859"];
const HIGH = ["#9aa085", "#a8ad92", "#b08d57", "#c49a62"];

const limbs: Limb[] = [];
const leaves: Leaf[] = [];
const masses: Mass[] = [];
const rng = mulberry32(20260714);

/** Place a cluster of leaves around a point. */
function cluster(x: number, y: number, ang: number, n: number, layer: number, spread: number) {
  for (let i = 0; i < n; i++) {
    const a = ang + (rng() - 0.5) * spread;
    const d = rng() * 20;
    const pal = layer === 0 ? DEEP : layer === 1 ? MID : layer === 2 ? LIT : HIGH;
    leaves.push({
      x: x + Math.cos(a) * d + (rng() - 0.5) * 11,
      y: y + Math.sin(a) * d + (rng() - 0.5) * 11,
      r: (a * 180) / Math.PI + (rng() - 0.5) * 80,
      s: 0.5 + rng() * (layer === 3 ? 1.05 : 0.85),
      c: pal[(rng() * pal.length) | 0],
      o: layer === 0 ? 0.5 + rng() * 0.3 : layer === 3 ? 0.62 + rng() * 0.38 : 0.55 + rng() * 0.4,
      l: layer,
    });
  }
}

function grow(c: Curve, w0: number, w1: number, depth: number, owner: number, maxDepth: number) {
  // lit side faces the upper-left key light
  limbs.push({ d: taper(c, w0, w1, depth === 0 ? 20 : 12), depth, owner, lit: c.p0[0] < 500 });

  if (depth >= maxDepth) {
    const a = tangent(c, 1);
    cluster(c.p3[0], c.p3[1], a, 4, 2, 2.6);
    cluster(at(c, 0.7)[0], at(c, 0.7)[1], a, 2, 1, 2.9);
    return;
  }

  const base = span(c);
  const ts = depth === 0 ? [0.42, 0.6, 0.76, 0.9, 0.98] : [0.5, 0.82];
  let flip = rng() < 0.5 ? -1 : 1;

  for (const t of ts) {
    const [x, y] = at(c, t);
    const ang = tangent(c, t);
    flip *= -1;
    const spread = (0.36 + rng() * 0.34) * flip;
    const len = base * (depth === 0 ? 0.26 + rng() * 0.15 : 0.42 + rng() * 0.17);
    const cw = (w0 + (w1 - w0) * t) * (depth === 0 ? 0.44 : 0.5);
    const childAng = ang + spread - 0.18 * Math.sign(spread || 1);
    grow(makeCurve(x, y, childAng, len, -0.36 * flip), Math.max(cw, 1.6), Math.max(cw * 0.28, 0.9), depth + 1, owner, maxDepth);
  }

  if (depth === maxDepth - 1) {
    const a = tangent(c, 1);
    cluster(c.p3[0], c.p3[1], a, 3, 3, 3.0);
    if (masses.length === 0 || rng() < 0.55) {
      masses.push({ x: c.p3[0], y: c.p3[1], rx: 52 + rng() * 32, ry: 36 + rng() * 22, l: 1 });
    }
  }
}

PROJECT_CURVES.forEach((b, i) => grow(b.c, b.w, b.w * 0.24, 0, i, 3));
FILLER_CURVES.forEach((b) => grow(b.c, b.w, b.w * 0.24, 0, -1, 2));

/* ---------- derived exports ---------- */
export const PROJECT_TIPS: { tip: P; side: "left" | "right" }[] = PROJECT_CURVES.map((b) => ({
  tip: b.c.p3,
  side: b.side,
}));

export const PROJECT_LIMB_D: string[] = PROJECT_CURVES.map((b) => taper(b.c, b.w, b.w * 0.24, 20));
export const PROJECT_LIMB_LIT: string[] = PROJECT_CURVES.map((b) => {
  const c = b.c;
  const a = tangent(c, 0.5) + Math.PI / 2;
  const [mx, my] = at(c, 0.5);
  const off = b.w * 0.3;
  return taper(
    {
      p0: at(c, 0.06),
      p1: [at(c, 0.35)[0] + Math.cos(a) * off, at(c, 0.35)[1] + Math.sin(a) * off],
      p2: [mx + Math.cos(a) * off * 0.6, my + Math.sin(a) * off * 0.6],
      p3: at(c, 0.72),
    },
    b.w * 0.3,
    b.w * 0.06,
    10
  );
});

export const STATIC_LIMBS = limbs.filter((l) => l.owner < 0);
export const LIMBS_BY_OWNER: Record<number, Limb[]> = {};
for (const l of limbs) if (l.owner >= 0 && l.depth > 0) (LIMBS_BY_OWNER[l.owner] ||= []).push(l);

export const LEAVES = leaves;
export const MASSES = masses;

/** Four foliage depth layers, back to front. */
export const LEAF_LAYERS: Leaf[][] = [0, 1, 2, 3].map((l) => leaves.filter((lf) => lf.l === l));

/** Two leaf silhouettes for variety. */
export const LEAF_A = "M0 0C3.4-3.8 10-4 14.2 0C10 4 3.4 3.8 0 0Z";
export const LEAF_B = "M0 0C2.6-4.6 8.6-5.4 12.6-1.6C14.6 0.4 13.4 3.2 10.4 3.4C6.4 3.8 2.4 2.4 0 0Z";
