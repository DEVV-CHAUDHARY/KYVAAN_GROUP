import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BRAND } from "../data/brand";
import Logo from "./Logo";

export default function Hero({ onExplore }: { onExplore: (id: string) => void }) {
  const [armed, setArmed] = useState(false);

  /* Load the brand film only once the page has settled, and never on
     save-data or slow connections — the poster carries the hero. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    if (c?.saveData) return;
    if (c?.effectiveType && !/4g/.test(c.effectiveType)) return;
    const t = window.setTimeout(() => setArmed(true), 1800);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative flex h-[100svh] min-h-[620px] items-center justify-center overflow-hidden bg-ink">
      {/* the film, framed as an editorial plate on the ivory page */}
      <div className="grain absolute inset-x-3 bottom-3 top-[76px] overflow-hidden rounded-[22px] bg-ink-3 md:inset-x-5 md:bottom-5 md:top-[96px] md:rounded-[30px]">
        {/* poster — always present, never blocks */}
        <img
          src={BRAND.heroPoster}
          alt="KYVAAN Group — architecture and open land at golden hour"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />

        {/* brand film — client master first, cinematic fallback second */}
        {armed && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={BRAND.heroPoster}
            aria-label="KYVAAN Group brand film"
          >
            <source src={BRAND.heroVideoPrimary} type="video/mp4" />
            <source src={BRAND.heroVideoFallback} type="video/mp4" />
          </video>
        )}

        {/* warm espresso grade — keeps ivory type legible, keeps the film warm */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/45 via-espresso/30 to-espresso/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(36,24,16,0.28)_0%,transparent_70%)]" />
        <div
          className="light-drift absolute -top-1/4 left-1/2 h-[90vh] w-[70vw] -translate-x-1/2 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(233,210,174,0.32) 0%, rgba(233,210,174,0.08) 45%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto mt-14 max-w-5xl px-8 text-center md:mt-16">
        {/* the official KYVAAN logo — replaceable image asset */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="rounded-[22px] border border-ivory/20 bg-ivory/90 px-5 py-3 shadow-[0_18px_50px_rgba(36,24,16,0.22)] backdrop-blur-sm md:px-7 md:py-4">
            <Logo imgClassName="h-20 md:h-28" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
          className="eyebrow text-ivory/85"
        >
          {BRAND.tagline}
        </motion.p>

        <h1 className="mt-6 font-display text-[14vw] font-normal leading-[0.98] text-ivory md:text-[8rem]">
          <span className="reveal-mask">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 1.62, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Spaces that
            </motion.span>
          </span>
          <span className="reveal-mask">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 1.76, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="block italic text-[#ecd6b4]"
            >
              shape lives.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-ivory/85 md:text-base"
        >
          {BRAND.statement}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.15, duration: 1.2, ease: "easeOut" }}
          className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
        >
          <button
            onClick={() => onExplore("tree")}
            className="btn-primary w-full justify-center border-ivory sm:w-auto"
            data-magnetic
            data-cursor="link"
          >
            Explore KYVAAN
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 1v12M1 7l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => onExplore("projects")}
            className="btn-light w-full justify-center sm:w-auto"
            data-magnetic
            data-cursor="link"
          >
            Explore Projects
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.2 }}
        className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 md:bottom-11"
      >
        <span className="text-[0.56rem] uppercase tracking-[0.35em] text-ivory/75">
          Scroll to discover
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-ivory/25">
          <span className="animate-scroll-line absolute inset-x-0 top-0 h-full bg-ivory" />
        </span>
      </motion.div>
    </section>
  );
}
