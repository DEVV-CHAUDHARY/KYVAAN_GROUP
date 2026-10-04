import { animate, motion, useMotionValue } from "framer-motion";
import { memo, useRef, useState } from "react";
import { PROJECTS } from "../data/projects";
import Logo from "./Logo";
import {
  BARK_D,
  BUTTRESS_D,
  GROUND,
  KNOTS,
  LEADER_D,
  LEAF_A,
  LEAF_B,
  LEAF_LAYERS,
  LENTICELS,
  LIMBS_BY_OWNER,
  MASSES,
  PROJECT_LIMB_D,
  PROJECT_LIMB_LIT,
  PROJECT_TIPS,
  ROOT_D,
  STATIC_LIMBS,
  TRUNK_D,
  VIEW_H,
  VIEW_W,
} from "../lib/treeGeometry";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   Static mass — rendered once, memoised, never re-rendered on hover
   ============================================================ */
const StaticTree = memo(function StaticTree() {
  return (
    <g>
      {/* Layer 1 — deep shadow foliage behind everything */}
      <g transform="translate(500 400) scale(0.86) translate(-500 -400)" opacity="0.5">
        {STATIC_LIMBS.map((l, i) => (
          <path key={`dl${i}`} d={l.d} fill="#6a5238" />
        ))}
        {MASSES.map((m, i) => (
          <ellipse key={`dm${i}`} cx={m.x} cy={m.y} rx={m.rx * 1.1} ry={m.ry * 1.1} fill="url(#massDeep)" />
        ))}
        {LEAF_LAYERS[0].map((lf, i) => (
          <Leaf key={`d${i}`} {...lf} />
        ))}
      </g>

      {/* mid foliage masses */}
      <g>
        {MASSES.map((m, i) => (
          <ellipse key={i} cx={m.x} cy={m.y} rx={m.rx} ry={m.ry} fill="url(#massMid)" />
        ))}
      </g>

      {/* roots */}
      <g fill="url(#barkRoot)">
        {ROOT_D.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* buttress flares */}
      <g fill="url(#barkH)">
        {BUTTRESS_D.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* trunk body */}
      <path d={TRUNK_D} fill="url(#barkH)" />
      {/* rim light on the lit side */}
      <path d={TRUNK_D} fill="url(#trunkRim)" />
      {/* core shadow on the far side */}
      <path d={TRUNK_D} fill="url(#trunkShade)" />

      {/* bark grain */}
      <g stroke="#31261a" strokeWidth="1.3" fill="none" opacity="0.45">
        {BARK_D.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      {/* lit grain — catches the key light */}
      <g stroke="rgba(207,169,111,0.2)" strokeWidth="1" fill="none" opacity="0.7">
        {BARK_D.slice(2, 7).map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* lenticels */}
      <g fill="rgba(243,237,225,0.09)">
        {LENTICELS.map((l, i) => (
          <ellipse key={i} cx={l.x} cy={l.y} rx={l.w / 2} ry="1.1" />
        ))}
      </g>

      {/* knots */}
      {KNOTS.map((k, i) => (
        <g key={i}>
          <ellipse cx={k.x} cy={k.y} rx={k.r} ry={k.r * 1.35} fill="rgba(28,21,13,0.6)" />
          <ellipse cx={k.x - k.r * 0.2} cy={k.y - k.r * 0.25} rx={k.r * 0.45} ry={k.r * 0.6} fill="rgba(0,0,0,0.5)" />
        </g>
      ))}

      {/* central leader */}
      <path d={LEADER_D} fill="url(#barkV)" />

      {/* secondary limbs */}
      {STATIC_LIMBS.map((l, i) => (
        <path key={i} d={l.d} fill={l.depth === 0 ? "url(#barkH)" : "url(#barkV)"} />
      ))}

      {/* Layer 2 — mid foliage */}
      <g>{LEAF_LAYERS[1].map((lf, i) => <Leaf key={i} {...lf} />)}</g>
    </g>
  );
});

function Leaf({ x, y, r, s, c, o }: { x: number; y: number; r: number; s: number; c: string; o: number }) {
  return (
    <path
      d={s > 0.95 ? LEAF_B : LEAF_A}
      fill={c}
      opacity={o}
      transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r.toFixed(0)}) scale(${s.toFixed(2)})`}
    />
  );
}

/* ============================================================
   Tree experience
   ============================================================ */
export default function TreeExperience({
  onOpenProject,
  activeSlug,
}: {
  onOpenProject: (slug: string) => void;
  activeSlug?: string | null;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const busy = useRef(false);

  const camX = useMotionValue(0);
  const camY = useMotionValue(0);
  const camS = useMotionValue(1);

  const highlighted = PROJECTS.findIndex((p) => p.slug === activeSlug);
  const active = locked ?? hovered ?? (highlighted >= 0 ? highlighted : null);

  /** Branch illuminates → name appears → short camera move → project route opens. */
  const select = (i: number) => {
    if (busy.current) return;
    const slug = PROJECTS[i].slug;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onOpenProject(slug);
      return;
    }
    busy.current = true;
    setLocked(i);

    const s = 1.4;
    const [tx, ty] = PROJECT_TIPS[i].tip;
    const o = { duration: 0.75, ease: EASE } as const;
    animate(camS, s, o);
    animate(camX, VIEW_W / 2 - tx * s, o);
    animate(camY, 380 - ty * s, o);

    window.setTimeout(() => {
      onOpenProject(slug);
      window.setTimeout(() => {
        animate(camS, 1, { duration: 0.6, ease: EASE });
        animate(camX, 0, { duration: 0.6, ease: EASE });
        animate(camY, 0, { duration: 0.6, ease: EASE });
        setLocked(null);
        setHovered(null);
        busy.current = false;
      }, 1000);
    }, 700);
  };

  return (
    <section
      id="tree"
      className="relative flex h-[100svh] min-h-[680px] flex-col overflow-hidden border-y border-line bg-ink-2"
      aria-labelledby="tree-heading"
    >
      {/* atmosphere — a soft pool of gallery light behind the tree */}
      <div
        className="pointer-events-none absolute left-1/2 top-[46%] h-[86vh] w-[86vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(253,250,243,0.85) 0%, rgba(248,244,236,0.45) 38%, rgba(154,94,46,0.05) 62%, transparent 74%)",
        }}
      />
      {/* gallery floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-ink-3/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[
          { l: 16, t: 60, s: 2.5, d: 0, u: 26 },
          { l: 30, t: 36, s: 2, d: 8, u: 30 },
          { l: 47, t: 68, s: 2.5, d: 3, u: 27 },
          { l: 62, t: 30, s: 2, d: 12, u: 32 },
          { l: 79, t: 58, s: 2.5, d: 5, u: 26 },
          { l: 90, t: 38, s: 2, d: 15, u: 31 },
        ].map((p, i) => (
          <span
            key={i}
            className="particle"
            style={
              {
                left: `${p.l}%`,
                top: `${p.t}%`,
                width: p.s,
                height: p.s,
                animationDelay: `${p.d}s`,
                animationDuration: `${p.u}s`,
                "--px": "11px",
                "--py": "-80px",
                "--po": 0.3,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* heading */}
      <header className="relative z-20 shrink-0 px-6 pt-20 md:px-10 md:pt-24">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-bronze">02 / KYVAAN ecosystem</p>
            <h2
              id="tree-heading"
              className="mt-2.5 font-display text-[2.1rem] font-normal leading-[1.02] text-bone md:text-6xl"
            >
              One mark. <span className="italic text-bronze-2">Many possibilities.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            {/* the official mark, placed subtly beside the ecosystem */}
            <Logo imgClassName="h-7" className="opacity-60 transition-opacity duration-700 hover:opacity-100" />
            <p className="max-w-[18rem] text-xs font-light leading-relaxed text-bone/55 md:text-right">
              Six branches grow from the KYVAAN mark. Select one to enter the project.
            </p>
          </div>
        </div>
      </header>

      {/* tree */}
      <div className="relative z-10 min-h-0 flex-1">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMax meet"
          className="absolute inset-0 h-full w-full select-none max-md:origin-bottom max-md:scale-[1.38]"
          role="img"
          aria-label="The KYVAAN ecosystem tree — six project branches"
        >
          <defs>
            {/* bark — horizontal gradient reads as a cylinder */}
            <linearGradient id="barkH" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#33271a" />
              <stop offset="22%" stopColor="#5e4a2e" />
              <stop offset="46%" stopColor="#8a6d42" />
              <stop offset="68%" stopColor="#6d5636" />
              <stop offset="100%" stopColor="#2a2015" />
            </linearGradient>
            <linearGradient id="barkV" x1="0" y1="1" x2="0.35" y2="0">
              <stop offset="0%" stopColor="#4a3c27" />
              <stop offset="55%" stopColor="#83683f" />
              <stop offset="100%" stopColor="#b58c58" />
            </linearGradient>
            <linearGradient id="barkRoot" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6b5535" />
              <stop offset="100%" stopColor="#241b11" />
            </linearGradient>
            {/* key light from upper left */}
            <linearGradient id="trunkRim" x1="0" y1="1" x2="0.4" y2="0">
              <stop offset="0%" stopColor="rgba(207,169,111,0)" />
              <stop offset="62%" stopColor="rgba(207,169,111,0.12)" />
              <stop offset="100%" stopColor="rgba(243,237,225,0.28)" />
            </linearGradient>
            {/* shade on the far side */}
            <linearGradient id="trunkShade" x1="1" y1="0" x2="0.55" y2="0">
              <stop offset="0%" stopColor="rgba(10,8,5,0.5)" />
              <stop offset="55%" stopColor="rgba(10,8,5,0)" />
            </linearGradient>
            {/* foliage masses */}
            <radialGradient id="massDeep" cx="0.5" cy="0.45" r="0.55">
              <stop offset="0%" stopColor="rgba(52,58,45,0.55)" />
              <stop offset="100%" stopColor="rgba(52,58,45,0)" />
            </radialGradient>
            <radialGradient id="massMid" cx="0.44" cy="0.4" r="0.56">
              <stop offset="0%" stopColor="rgba(105,112,88,0.34)" />
              <stop offset="58%" stopColor="rgba(80,87,66,0.16)" />
              <stop offset="100%" stopColor="rgba(80,87,66,0)" />
            </radialGradient>
            <radialGradient id="ground" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="rgba(36,24,16,0.2)" />
              <stop offset="100%" stopColor="rgba(36,24,16,0)" />
            </radialGradient>
            <filter id="limbGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.g style={{ x: camX, y: camY, scale: camS }}>
            <ellipse cx={VIEW_W / 2} cy={GROUND + 48} rx="280" ry="18" fill="url(#ground)" />

            {/* everything that never changes */}
            <g style={{ opacity: active !== null ? 0.36 : 1, transition: "opacity .6s ease" }}>
              <StaticTree />
            </g>

            {/* the six project limbs */}
            {PROJECT_TIPS.map((_b, i) => {
              const dim = active !== null && active !== i;
              const on = active === i;
              return (
                <g
                  key={i}
                  style={{ opacity: dim ? 0.2 : 1, transition: "opacity .6s ease" }}
                  filter={on ? "url(#limbGlow)" : undefined}
                >
                  <path d={PROJECT_LIMB_D[i]} fill="url(#barkH)" />
                  <path d={PROJECT_LIMB_LIT[i]} fill="rgba(207,169,111,0.22)" />
                  {(LIMBS_BY_OWNER[i] ?? []).map((l, k) => (
                    <path key={k} d={l.d} fill="url(#barkV)" />
                  ))}
                  {on && <path d={PROJECT_LIMB_D[i]} fill="rgba(207,169,111,0.42)" />}
                </g>
              );
            })}

            {/* Layer 3 — lit foliage, drawn over the limbs for depth */}
            <g style={{ opacity: active !== null ? 0.4 : 1, transition: "opacity .6s ease" }}>
              {LEAF_LAYERS[2].map((lf, i) => (
                <Leaf key={i} {...lf} />
              ))}
            </g>

            {/* Layer 4 — highlights, sparse and warm */}
            <g style={{ opacity: active !== null ? 0.3 : 1, transition: "opacity .6s ease" }}>
              {LEAF_LAYERS[3].map((lf, i) => (
                <Leaf key={i} {...lf} />
              ))}
            </g>

            {/* markers + labels */}
            {PROJECT_TIPS.map((b, i) => {
              const p = PROJECTS[i];
              const [tx, ty] = b.tip;
              const on = active === i;
              const dim = active !== null && !on;
              const live = p.status === "live";
              const pw = 254;
              const px = b.side === "right" ? tx - pw - 26 : tx + 26;
              const py = Math.min(Math.max(ty - 54, 6), VIEW_H - 124);

              return (
                <g key={p.slug} style={{ opacity: dim ? 0.3 : 1, transition: "opacity .6s ease" }}>
                  {live && (
                    <circle
                      cx={tx}
                      cy={ty}
                      r="12"
                      fill="none"
                      stroke="#9a5e2e"
                      strokeWidth="1.1"
                      className="pulse-ring"
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    />
                  )}
                  {/* ivory marker with a soft cast shadow */}
                  <circle cx={tx} cy={ty + 2} r="17" fill="rgba(36,24,16,0.14)" />
                  <circle cx={tx} cy={ty} r="16" fill="#f8f4ec" />
                  <circle
                    cx={tx}
                    cy={ty}
                    r={on ? 16 : 12}
                    fill="none"
                    stroke={live ? "#9a5e2e" : "rgba(36,24,16,0.45)"}
                    strokeWidth="1.5"
                    style={{ transition: "r .6s ease" }}
                  />
                  <circle
                    cx={tx}
                    cy={ty}
                    r={on ? 5.5 : 4}
                    fill={live ? "#9a5e2e" : "rgba(36,24,16,0.55)"}
                    style={{ transition: "r .6s ease" }}
                  />
                  <text
                    x={b.side === "right" ? tx + 27 : tx - 27}
                    y={ty + 5}
                    textAnchor={b.side === "right" ? "start" : "end"}
                    fill={on ? "#8f5629" : "rgba(36,24,16,0.62)"}
                    fontSize="14"
                    letterSpacing="3"
                    style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
                  >
                    {p.number}
                  </text>

                  {/* hover plate */}
                  <g
                    style={{
                      opacity: on ? 1 : 0,
                      transition: "opacity .4s ease",
                      pointerEvents: on ? "auto" : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => select(i)}
                    data-cursor="explore"
                  >
                    <line
                      x1={b.side === "right" ? tx - 18 : tx + 18}
                      y1={ty}
                      x2={b.side === "right" ? px + pw : px}
                      y2={py + 58}
                      stroke="rgba(154,94,46,0.45)"
                      strokeWidth="1"
                    />
                    {/* editorial plate — ivory card, hairline beige border, soft shadow */}
                    <rect
                      x={px + 1}
                      y={py + 6}
                      width={pw}
                      height={118}
                      rx="14"
                      fill="rgba(36,24,16,0.08)"
                    />
                    <rect
                      x={px}
                      y={py}
                      width={pw}
                      height={118}
                      rx="14"
                      fill="rgba(248,244,236,0.97)"
                      stroke="#ded2c0"
                      strokeWidth="1"
                    />
                    <text
                      x={px + 20}
                      y={py + 28}
                      fill={live ? "#8f5629" : "#76695d"}
                      fontSize="10"
                      letterSpacing="2.4"
                      style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
                    >
                      {p.statusLabel.toUpperCase()}
                    </text>
                    <text
                      x={px + 20}
                      y={py + 62}
                      fill="#241810"
                      fontSize="29"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
                    >
                      {p.name}
                    </text>
                    <text
                      x={px + 20}
                      y={py + 85}
                      fill="#76695d"
                      fontSize="11.5"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {p.location ?? p.category}
                    </text>
                    <text
                      x={px + 20}
                      y={py + 106}
                      fill="#8f5629"
                      fontSize="10"
                      letterSpacing="2"
                      style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
                    >
                      EXPLORE PROJECT →
                    </text>
                  </g>

                  {/* generous hit target */}
                  <circle
                    cx={tx}
                    cy={ty}
                    r="52"
                    fill="transparent"
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.name} — ${p.statusLabel}. Open project ${p.number} of 6`}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => !locked && setHovered(i)}
                    onMouseLeave={() => !locked && setHovered(null)}
                    onFocus={() => !locked && setHovered(i)}
                    onBlur={() => !locked && setHovered(null)}
                    onClick={() => select(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        select(i);
                      }
                    }}
                    data-cursor="explore"
                  />
                </g>
              );
            })}
          </motion.g>
        </svg>
      </div>

      {/* mobile rail */}
      <div className="no-bar relative z-20 flex shrink-0 gap-2 overflow-x-auto px-6 pb-5 md:hidden">
        {PROJECTS.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => select(i)}
            className={`flex min-h-[46px] shrink-0 items-center gap-2.5 rounded-full border bg-ink px-4 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ${
              active === i ? "border-bronze/50 text-bronze" : "border-line text-bone/75"
            }`}
          >
            <span className="text-bronze">{p.number}</span>
            {p.name}
          </button>
        ))}
      </div>

      <p className="relative z-20 hidden shrink-0 pb-5 text-center text-[0.56rem] uppercase tracking-[0.35em] text-bone/40 md:block">
        Select a branch to enter the project
      </p>
    </section>
  );
}
