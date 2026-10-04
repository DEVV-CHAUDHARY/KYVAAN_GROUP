import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS } from "../data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP_VH = 85;

type Props = {
  onOpenProject: (slug: string) => void;
  onReady?: (jump: (index: number) => void) => void;
};

export default function ProjectShowcase({ onOpenProject, onReady }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = PROJECTS.length;
  const project = PROJECTS[index];

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = trackRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const scrollable = el.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const p = Math.min(Math.max(-rect.top / scrollable, 0), 0.9999);
        const next = Math.min(count - 1, Math.floor(p * count));
        setIndex((cur) => (cur === next ? cur : next));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  const jump = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const clamped = Math.min(Math.max(i, 0), count - 1);
      const scrollable = el.offsetHeight - window.innerHeight;
      const top = el.offsetTop + ((clamped + 0.5) / count) * scrollable;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    },
    [count]
  );

  useEffect(() => {
    onReady?.(jump);
  }, [jump, onReady]);

  // touch swipe
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) jump(index + (dx < 0 ? 1 : -1));
    touch.current = null;
  };

  const isLive = project.status === "live";

  return (
    <section
      id="projects"
      ref={trackRef}
      style={{ height: `${count * STEP_VH}vh` }}
      aria-labelledby="projects-heading"
    >
      <div
        className="sticky top-0 h-[100svh] overflow-hidden bg-ink"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <h2 id="projects-heading" className="sr-only">
          KYVAAN projects
        </h2>
        <p className="eyebrow pointer-events-none absolute left-6 top-20 z-20 text-bronze md:left-10 md:top-24">
          03 / Selected projects
        </p>

        {/* visual — full-bleed on mobile, an editorial plate on desktop */}
        <div className="absolute inset-0 overflow-hidden md:inset-y-[104px] md:left-[40%] md:right-6 md:rounded-[26px] md:shadow-[0_1px_2px_rgba(36,24,16,0.05),0_30px_60px_-36px_rgba(36,24,16,0.35)] lg:right-10">
          <AnimatePresence initial={false} mode="sync">
            <motion.img
              key={project.slug}
              src={project.heroImage}
              alt={project.heroAlt}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </AnimatePresence>

          {/* per-project atmosphere */}
          <motion.div
            key={`${project.slug}-tint`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${project.tint}, transparent 60%)` }}
          />
          {/* mobile: ivory page fades up under the text */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-transparent md:hidden" />
          {/* desktop: a whisper of grade inside the frame */}
          <div className="absolute inset-0 hidden bg-gradient-to-t from-espresso/25 via-transparent to-transparent md:block" />
        </div>

        {/* information */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-end px-6 pb-24 pt-24 md:justify-center md:px-10 md:pb-16">
          <div className="max-w-xl md:max-w-[34%]">
            <div className="flex items-center gap-4">
              <span className="font-display text-sm text-bronze-2">{project.number}</span>
              <span className="h-px w-10 bg-bronze/50" />
              <span className="text-[0.58rem] uppercase tracking-[0.3em] text-bone/45">
                {project.number} / 0{count}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <span
                  className={`mt-6 inline-block rounded-full border px-3.5 py-1.5 text-[0.55rem] font-bold uppercase tracking-[0.25em] ${
                    isLive
                      ? "border-bronze/45 bg-bronze/[0.07] text-bronze"
                      : "border-bone/20 bg-ink text-bone/65"
                  }`}
                >
                  {project.statusLabel}
                </span>

                <h3 className="mt-5 font-display text-[3.25rem] font-normal leading-[0.98] text-bone md:text-[4.75rem] lg:text-[5.5rem]">
                  {project.name}
                </h3>

                <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] uppercase tracking-[0.22em] text-bone/55">
                  <span>{project.category}</span>
                  {project.location && (
                    <>
                      <span className="text-bronze">·</span>
                      <span>{project.location}</span>
                    </>
                  )}
                </p>

                <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-bone/70">
                  {project.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onOpenProject(project.slug)}
                    className="btn-primary"
                    data-magnetic
                    data-cursor="explore"
                  >
                    Explore Project
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 7h12M8 1l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {!isLive && (
                    <span className="max-w-[15rem] text-[0.6rem] leading-relaxed text-bone/40">
                      Visual concept only — not a current KYVAAN development.
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* index rail */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center gap-4 md:glass md:bottom-auto md:left-auto md:right-12 md:top-1/2 md:w-[17rem] md:-translate-y-1/2 md:flex-col md:items-end md:gap-3 md:rounded-[20px] md:p-5 lg:right-16">
          <div className="hidden w-full flex-col gap-1.5 md:flex">
            {PROJECTS.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => jump(i)}
                className="group flex items-center justify-end gap-3 py-1 text-right"
                aria-label={`Go to project ${p.number}, ${p.name}`}
                aria-current={i === index}
                data-cursor="link"
              >
                <span
                  className={`text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    i === index ? "text-bone" : "text-bone/35 group-hover:text-bone/70"
                  }`}
                >
                  {p.name}
                </span>
                <span
                  className={`h-px transition-all duration-500 ${
                    i === index ? "w-9 bg-bronze" : "w-4 bg-bone/25 group-hover:w-6"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex flex-1 items-center gap-3 md:hidden">
            <span className="text-[0.6rem] tracking-[0.2em] text-bone/60">
              {project.number} / 0{count}
            </span>
            <span className="relative h-px flex-1 bg-bone/15">
              <span
                className="absolute inset-y-0 left-0 bg-bronze transition-all duration-500"
                style={{ width: `${((index + 1) / count) * 100}%` }}
              />
            </span>
          </div>

          <div className="flex gap-2 md:mt-4">
            <button
              onClick={() => jump(index - 1)}
              disabled={index === 0}
              aria-label="Previous project"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-bone/80 transition-colors hover:text-bronze-2 disabled:opacity-25"
              data-cursor="link"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M13 7H1M7 1L1 7l6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => jump(index + 1)}
              disabled={index === count - 1}
              aria-label="Next project"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-bone/80 transition-colors hover:text-bronze-2 disabled:opacity-25"
              data-cursor="link"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M1 7h12M7 1l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-bone/10">
          <div
            className="h-full bg-bronze transition-all duration-500"
            style={{ width: `${((index + 1) / count) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
