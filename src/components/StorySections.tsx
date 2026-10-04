import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: "-70px" } as const;

/* ---------------- 01 — compact brand intro ---------------- */
export function IntroSection() {
  return (
    <section id="vision" className="mx-auto max-w-[1500px] px-6 py-16 md:px-10 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7 }}
            className="eyebrow text-bronze"
          >
            01 / The KYVAAN idea
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
            className="mt-4 font-display text-[2.3rem] font-normal leading-[1.02] text-bone md:text-[4rem]"
          >
            Built with clarity. <span className="italic text-bronze-2">Designed to endure.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.85, delay: 0.16 }}
            className="mt-5 max-w-xl text-[0.93rem] font-light leading-relaxed text-bone/65"
          >
            From the first line on a drawing to the final detail in a lobby, great real estate is a
            balance of architecture, experience and long-term thinking. KYVAAN is designed to feel
            relevant today — and valuable for years to come.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          viewport={inView}
          transition={{ duration: 1.1, ease: EASE }}
          className="img-frame relative aspect-[16/10] md:col-span-5 md:aspect-[4/3]"
        >
          <img
            src="./images/vision.jpg"
            alt="An architectural study — a scale model beside drawings in warm window light"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            data-cursor="view"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- 03 — philosophy (compact editorial) ---------------- */
export function PhilosophySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-line bg-ink-3"
      aria-labelledby="philosophy-heading"
    >
      <motion.img
        style={{ y }}
        src="./images/radhika-detail.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-[112%] w-full object-cover opacity-30 mix-blend-multiply grayscale-[35%] sepia-[25%]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-3 via-ink-3/80 to-ink-3/45" />

      <div className="relative mx-auto max-w-[1500px] px-6 py-20 md:px-10 md:py-28">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.7 }}
          className="eyebrow text-bronze"
        >
          04 / Brand philosophy
        </motion.p>
        <motion.h2
          id="philosophy-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="mt-5 max-w-4xl font-display text-[2.4rem] font-normal leading-[1.02] text-bone md:text-[4.75rem]"
        >
          Every development should have{" "}
          <span className="italic text-bronze-2">a reason to exist.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-10 grid gap-6 border-t border-bone/15 pt-8 md:grid-cols-3"
        >
          {[
            { n: "01", t: "Design-led thinking" },
            { n: "02", t: "Long-term value" },
            { n: "03", t: "Human-scale experience" },
          ].map((p) => (
            <div key={p.n} className="flex items-baseline gap-4">
              <span className="text-[0.6rem] tracking-[0.3em] text-bronze">{p.n}</span>
              <span className="font-display text-2xl font-medium text-bone">{p.t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- 04 — visual story (image-led) ---------------- */
const STORY = [
  { src: "./images/radhika-villa.jpg", alt: "Farmhouse architecture at golden hour", label: "Material" },
  { src: "./images/shriji-greens.jpg", alt: "Community greens and walking paths", label: "Landscape" },
  { src: "./images/about-interior.jpg", alt: "Quiet interior with natural daylight", label: "Light" },
];

export function VisualStory() {
  return (
    <section className="mx-auto max-w-[1500px] px-6 py-16 md:px-10 md:py-20" aria-label="Architectural story">
      <div className="grid gap-4 md:grid-cols-3">
        {STORY.map((s, i) => (
          <motion.figure
            key={s.src}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
            className={`img-frame relative ${i === 1 ? "md:mt-10" : ""}`}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={s.src}
                alt={s.alt}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                data-cursor="view"
              />
            </div>
            <figcaption className="caption-photo absolute bottom-4 left-5 text-[0.58rem] font-semibold uppercase tracking-[0.3em]">
              {s.label}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 05 — about (compact) ---------------- */
export function AboutSection() {
  return (
    <section id="about" className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-6 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          viewport={inView}
          transition={{ duration: 1.1, ease: EASE }}
          className="img-frame relative aspect-[16/10] md:col-span-5 md:aspect-[4/3]"
        >
          <img
            src="./images/hero-poster.jpg"
            alt="KYVAAN developments within open landscape at golden hour"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            data-cursor="view"
          />
        </motion.div>

        <div className="md:col-span-6 md:col-start-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7 }}
            className="eyebrow text-bronze"
          >
            05 / Who we are
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            className="mt-4 font-display text-[2.3rem] font-normal leading-[1.02] text-bone md:text-[4rem]"
          >
            A new chapter <span className="italic text-bronze-2">in real estate.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.9, delay: 0.16 }}
            className="mt-5 max-w-lg text-[0.93rem] font-light leading-relaxed text-bone/65"
          >
            KYVAAN Group is built around a simple principle: every development should have a reason
            to exist. We bring together design, detail and disciplined execution to create places
            people want to return to.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
