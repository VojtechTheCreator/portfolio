export type Point = { x: number; y: number };
export type ThreadBox = { x: number; y: number; width: number; height: number; bottom: number };
export type ThreadLayout = {
  width: number; height: number;
  hero: ThreadBox; name: ThreadBox; profile: ThreadBox; projects: ThreadBox;
  scene: ThreadBox; internships: ThreadBox; contact: ThreadBox;
};
export type Cubic = { start: Point; control1: Point; control2: Point; end: Point };

/** Uniform cubic B-spline: adjacent pieces share both tangent and curvature. */
export function smoothCurve(points: Point[]): Cubic[] {
  if (points.length < 2) return [];
  const first = points[0];
  const last = points[points.length - 1];
  const controls = [first, first, ...points, last, last];
  const mix = (a: Point, b: Point, c: Point, weights: number[]): Point => ({
    x: (a.x * weights[0] + b.x * weights[1] + c.x * weights[2]) / 6,
    y: (a.y * weights[0] + b.y * weights[1] + c.y * weights[2]) / 6,
  });
  return Array.from({ length: controls.length - 3 }, (_, i) => ({
    start: mix(controls[i], controls[i + 1], controls[i + 2], [1, 4, 1]),
    control1: mix(controls[i], controls[i + 1], controls[i + 2], [0, 4, 2]),
    control2: mix(controls[i + 1], controls[i + 2], controls[i + 3], [2, 4, 0]),
    end: mix(controls[i + 1], controls[i + 2], controls[i + 3], [1, 4, 1]),
  }));
}

export function curvePath(curve: Cubic[]): string {
  if (!curve.length) return "";
  const point = (p: Point) => `${Math.round(p.x * 1000) / 1000} ${Math.round(p.y * 1000) / 1000}`;
  return `M ${point(curve[0].start)} ` + curve.map(c => `C ${point(c.control1)} ${point(c.control2)} ${point(c.end)}`).join(" ");
}

/** The original project gesture, retained as authored Bézier sweeps. */
const sceneGesture: Cubic[] = [
  { start: {x:8,y:144}, control1:{x:85,y:215}, control2:{x:278,y:211}, end:{x:426,y:108} },
  { start: {x:426,y:108}, control1:{x:568,y:9}, control2:{x:481,y:-19}, end:{x:309,y:62} },
  { start: {x:309,y:62}, control1:{x:120,y:151}, control2:{x:22,y:105}, end:{x:70,y:46} },
  { start: {x:70,y:46}, control1:{x:106,y:3}, control2:{x:230,y:25}, end:{x:355,y:91} },
  { start: {x:355,y:91}, control1:{x:429,y:130}, control2:{x:520,y:179}, end:{x:544,y:151} },
];

function sample(c: Cubic, t: number): Point {
  const u = 1 - t;
  return {
    x: u ** 3 * c.start.x + 3 * u ** 2 * t * c.control1.x + 3 * u * t ** 2 * c.control2.x + t ** 3 * c.end.x,
    y: u ** 3 * c.start.y + 3 * u ** 2 * t * c.control1.y + 3 * u * t ** 2 * c.control2.y + t ** 3 * c.end.y,
  };
}

export function threadPoints(layout: ThreadLayout): Point[] {
  const { width, hero, profile, projects, scene, internships, contact } = layout;
  const mobile = width <= 640;
  const p = (x: number, y: number): Point => ({x:width*x, y});
  // Excursions really continue beyond the viewport; clipping is only at the screen edge.
  // Long, quiet intervals keep the profile and internship copy legible.
  const points = [
    p(-.18, hero.y + 35),
    p(.06, hero.y + hero.height * .27),
    p(.4, hero.y + hero.height * .43),
    p(.73, hero.y + hero.height * .2),
    p(1.14, hero.y + hero.height * .12),
    p(1.23, hero.y + hero.height * .39),
    p(.85, hero.y + hero.height * .59),
    p(.48, hero.y + hero.height * .79),
    p(.2, hero.y + hero.height * .69),
    p(.07, hero.y + hero.height * .42),
    p(.24, hero.y + hero.height * .22),
    p(.47, hero.y + hero.height * .38),
    p(.45, hero.y + hero.height * .68),
    p(.21, hero.y + hero.height * .95),
    p(-.15, hero.y + hero.height * .8),
    p(-.27, hero.y + hero.height * .54),
    p(-.21, profile.y + 30),
    p(.13, profile.y + 25),
    p(.66, profile.y + 24),
    p(1.08, profile.y + 65),
    p(1.3, profile.y + profile.height * .3),
    p(1.08, profile.y + profile.height * .57),
    p(1.02, profile.y + profile.height * .75),
    p(1.19, profile.bottom - 32),
    p(.84, profile.bottom - 65),
    p(.35, projects.y + 32),
    p(-.12, projects.y + 68),
    p(-.3, scene.y + scene.height * .13),
    p(-.19, scene.y + scene.height * .55),
  ];
  const sx = scene.width * (mobile ? 1.65 : 1.13) / 550;
  const sy = mobile ? scene.height * .92 / 220 : sx;
  const transform = (q: Point): Point => ({
    x: scene.x + scene.width * (mobile ? -.31 : -.075) + q.x * sx,
    y: scene.y + scene.height * (mobile ? .52 : .48) + (q.y - 110) * sy,
  });
  // Sampling retains the original silhouette; one spline makes every join smooth.
  points.push(transform(sceneGesture[0].start));
  for (const c of sceneGesture) for (let step = 1; step <= 6; step++) points.push(transform(sample(c, step / 6)));
  points.push(
    p(1.18, scene.y + scene.height * .4),
    p(1.3, scene.y + scene.height * .08),
    p(1.38, scene.y + scene.height * .48),
    p(1.22, projects.bottom - 55),
    p(.91, projects.bottom - 40),
    p(.53, internships.y + 35),
    p(.11, internships.y + 18),
    p(-.18, internships.y + internships.height * .23),
    p(-.23, internships.y + internships.height * .58),
    p(-.09, internships.bottom - 58),
    p(.19, internships.bottom - 23),
    p(.68, internships.bottom + 7),
    p(1.2, contact.y + 30),
    p(1.27, contact.y + contact.height * .45),
    p(1.04, contact.bottom - 25),
    p(.72, contact.bottom - 15),
    p(.46, contact.bottom - 24),
    p(.12, contact.bottom - 15),
    p(-.15, contact.bottom - 25),
  );
  return points;
}

/** The gesture moves as a whole, rather than wobbling each control point independently. */
export function livingPoints(points: Point[], layout: ThreadLayout, time: number): Point[] {
  const center = {x:layout.scene.x + layout.scene.width * .5, y:layout.scene.y + layout.scene.height * .5};
  const angle = Math.sin(time * .23) * .034;
  const stretch = 1 + Math.sin(time * .31) * .025;
  return points.map(p => {
    const position = (p.y - layout.scene.y) / layout.scene.height;
    const weight = Math.max(0, Math.min(1, (position + .2) / .2, (1.2 - position) / .2));
    const x = p.x - center.x, y = p.y - center.y;
    const rotatedX = (x * Math.cos(angle) - y * Math.sin(angle)) * stretch;
    const rotatedY = x * Math.sin(angle) + y * Math.cos(angle);
    return {x:p.x + (rotatedX - x) * weight, y:p.y + (rotatedY - y) * weight};
  });
}

/** Unfold the figure eight into one round loop behind the selected photo. */
export function focusedPoints(points: Point[], photo: ThreadBox | null): Point[] {
  if (!photo) return points;
  // The 29 lead-in knots precede the original five sweeps (six samples each).
  const first = 29, last = first + sceneGesture.length * 6;
  const center = {x:photo.x + photo.width / 2, y:photo.y + photo.height / 2};
  const step = Math.PI * 2 / 20;
  const direction = center.y > points[first - 1].y ? -1 : 1;
  // Compensate for spline smoothing so every corner stays inside the circle.
  const radius = (Math.hypot(photo.width, photo.height) / 2 + 28) / ((4 + 2 * Math.cos(step)) / 6);
  return points.map((p, index) => {
    if (index < first || index > last) return p;
    const angle = Math.PI + direction * (index - first) * step;
    // Repeating a few periodic knots closes the round sweep while the same
    // uninterrupted stroke enters and leaves it through smooth tangents.
    return {x:center.x + Math.cos(angle) * radius, y:center.y + Math.sin(angle) * radius};
  });
}

/** Exact critically damped spring step; retargeting preserves position and velocity. */
export function springStep(position: number, velocity: number, target: number, seconds: number) {
  const frequency = 6.5;
  const displacement = position - target;
  const momentum = velocity + frequency * displacement;
  const decay = Math.exp(-frequency * seconds);
  const next = target + (displacement + momentum * seconds) * decay;
  const speed = (velocity - frequency * momentum * seconds) * decay;
  return Math.abs(next - target) < .01 && Math.abs(speed) < .01
    ? {position:target, velocity:0} : {position:next, velocity:speed};
}

/** Arc-length sampling lets the continuous stroke reveal everything above the fold. */
export function curveProgress(curve: Cubic[], bottom: number): number {
  if (!curve.length) return 1;
  let total = 0;
  let visible = 0;
  let previous = curve[0].start;
  for (const c of curve) for (let step = 1; step <= 16; step++) {
    const t = step / 16, u = 1 - t;
    const p = {
      x: u ** 3 * c.start.x + 3 * u ** 2 * t * c.control1.x + 3 * u * t ** 2 * c.control2.x + t ** 3 * c.end.x,
      y: u ** 3 * c.start.y + 3 * u ** 2 * t * c.control1.y + 3 * u * t ** 2 * c.control2.y + t ** 3 * c.end.y,
    };
    total += Math.hypot(p.x - previous.x, p.y - previous.y);
    if (p.y <= bottom) visible = total;
    previous = p;
  }
  return total ? visible / total : 1;
}
