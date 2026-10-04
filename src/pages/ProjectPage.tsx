import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PROJECTS, getProject } from "../data/projects";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import VideoBlock from "../components/VideoBlock";
import { transitionTo } from "../utils/transition";

const EASE = [0.22, 1, 0.36, 1] as const;
const seen = { once: true, margin: "-60px" } as const;

export default function ProjectPage({ onEnquire }: { onEnquire: (slug: string) => void }) {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const project = getProject(slug);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.45]);

  useEffect(() => {
    if (!project) {
      navigate("/", { replace: true });
      return;
    }
    document.title = `${project.name} — ${project.statusLabel} — KYVAAN Group`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", `${project.name} — ${project.statusLabel}. ${project.description}`);
  }, [project, navigate]);

  if (!project) return null;

  const live = project.status === "live";
  const i = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const [g0, g1, g2] = project.gallery;

  /** Return to the ecosystem — lands on the tree, with this branch highlighted. */
  const backToTree = () => transitionTo("/", undefined, { scrollTo: "tree", highlight: project.slug });

  return (
    <main className="bg-ink">
      <button
        onClick={backToTree}
        className="glass fixed left-5 top-20 z-40 flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-bone/80 transition-colors hover:text-bronze-2 md:left-8 md:top-24"
        data-cursor="link"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M13 7H1M7 1L1 7l6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        KYVAAN Ecosystem
      </button>

      {/* ---------- hero ---------- */}
      <header ref={heroRef} className="relative h-[92svh] min-h-[560px] overflow-hidden">
        <motion.img
          style={{ y: heroY, opacity: heroFade }}
          src={project.heroImage}
          alt={project.heroAlt}
          className="absolute inset-0 h-[115%] w-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${project.tint}, transparent 55%)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent md:via-ink/30" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/55 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1500px] px-6 pb-12 md:px-10 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-sm text-bronze-2">{project.number}</span>
              <span
                className={`rounded-full border px-3.5 py-1.5 text-[0.55rem] font-bold uppercase tracking-[0.25em] ${
                  live ? "border-bronze/45 bg-ink/80 text-bronze" : "border-bone/20 bg-ink/80 text-bone/70"
                }`}
              >
                {project.statusLabel}
              </span>
            </div>
            <h1 className="mt-5 font-display text-[3.4rem] font-normal leading-[0.96] text-bone md:text-[7rem]">
              {project.name}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] uppercase tracking-[0.22em] text-bone/60">
              <span>{project.category}</span>
              {project.location && (
                <>
                  <span className="text-bronze">·</span>
                  <span>{project.location}</span>
                </>
              )}
            </p>
            <p className="mt-5 max-w-lg text-sm font-light leading-relaxed text-bone/70">
              {project.tagline}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
                data-magnetic
                data-cursor="link"
              >
                Explore Project
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 1v12M1 7l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button onClick={() => onEnquire(project.slug)} className="btn-ghost" data-magnetic data-cursor="link">
                Enquire
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* concept disclosure */}
      {project.conceptNote && (
        <div className="border-y border-bone/10 bg-bone/[0.03]">
          <p className="mx-auto max-w-[1500px] px-6 py-4 text-[0.68rem] leading-relaxed text-bone/50 md:px-10">
            <span className="font-bold uppercase tracking-[0.2em] text-bone/70">Concept project — </span>
            {project.conceptNote}
          </p>
        </div>
      )}

      {/* ---------- overview ---------- */}
      <section className="mx-auto max-w-[1500px] px-6 py-14 md:px-10 md:py-18">
        <div className="grid gap-10 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={seen}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display text-[1.6rem] font-normal leading-[1.25] text-bone md:col-span-6 md:text-[2.3rem]"
          >
            {project.description}
          </motion.p>
          <div className="md:col-span-5 md:col-start-8">
            {project.story.map((para, n) => (
              <motion.p
                key={n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={seen}
                transition={{ duration: 0.85, delay: n * 0.1 }}
                className="mb-4 text-[0.92rem] font-light leading-relaxed text-bone/65"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- editorial gallery ---------- */}
      <section id="gallery" className="mx-auto max-w-[1500px] px-6 md:px-10" aria-label="Project gallery">
        <motion.figure
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          viewport={seen}
          transition={{ duration: 1.1, ease: EASE }}
          className="img-frame relative aspect-[16/9]"
        >
          <img src={g0.src} alt={g0.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" data-cursor="view" />
          <figcaption className="caption-photo absolute bottom-5 left-6 text-[0.56rem] font-semibold uppercase tracking-[0.28em]">
            {g0.caption}
          </figcaption>
        </motion.figure>

        {/* offset editorial pair */}
        <div className="mt-4 grid gap-4 md:grid-cols-12">
          <motion.figure
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={seen}
            transition={{ duration: 0.95, ease: EASE }}
            className="img-frame relative aspect-[3/2] md:col-span-7"
          >
            <img src={g1.src} alt={g1.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" data-cursor="view" />
            <figcaption className="caption-photo absolute bottom-5 left-6 text-[0.56rem] font-semibold uppercase tracking-[0.28em]">
              {g1.caption}
            </figcaption>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={seen}
            transition={{ duration: 0.95, delay: 0.12, ease: EASE }}
            className="img-frame relative aspect-[3/4] md:col-span-5 md:-mt-12"
          >
            <img src={g2.src} alt={g2.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" data-cursor="view" />
            <figcaption className="caption-photo absolute bottom-5 left-6 text-[0.56rem] font-semibold uppercase tracking-[0.28em]">
              {g2.caption}
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ---------- film ---------- */}
      {project.heroVideo && (
        <section className="mx-auto max-w-[1500px] px-6 pt-14 md:px-10 md:pt-18" aria-label="Project film">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <p className="eyebrow text-bronze">Film</p>
            <p className="text-[0.56rem] uppercase tracking-[0.24em] text-bone/35">
              {live ? "Project film" : "Concept film"}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={seen}
            transition={{ duration: 1, ease: EASE }}
            className="aspect-[16/9] w-full"
          >
            <VideoBlock
              src={project.heroVideo}
              poster={project.heroImage}
              label={`${project.name} — ${live ? "project film" : "concept film"}`}
              className="h-full w-full"
            />
          </motion.div>
        </section>
      )}

      {/* ---------- features + details ---------- */}
      <section className="mx-auto max-w-[1500px] px-6 py-14 md:px-10 md:py-18">
        <div className="grid gap-8 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={seen}
            transition={{ duration: 0.9, ease: EASE }}
            className="md:col-span-5"
          >
            <p className="eyebrow text-bronze">{live ? "Key features" : "Visual direction"}</p>
            <ul className="mt-5 divide-y divide-bone/10 border-y border-bone/10">
              {project.features.map((f) => (
                <li key={f} className="flex items-center gap-3 py-3.5 text-sm font-light text-bone/75">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-bronze" />
                  {f}
                </li>
              ))}
            </ul>
            {project.amenities.length > 0 && (
              <>
                <p className="eyebrow mt-8 text-bronze">Amenities</p>
                <ul className="mt-5 divide-y divide-bone/10 border-y border-bone/10">
                  {project.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-3 py-3.5 text-sm font-light text-bone/75">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-bronze" />
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={seen}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="card grid grid-cols-2 self-start overflow-hidden bg-ink-2/60 md:col-span-6 md:col-start-7"
          >
            {project.details.map((d, n) => (
              <div
                key={d.label}
                className={`p-6 md:p-7 ${n % 2 === 1 ? "border-l border-bone/10" : ""} ${
                  n >= 2 ? "border-t border-bone/10" : ""
                }`}
              >
                <dt className="eyebrow text-bronze">{d.label}</dt>
                <dd className="mt-2.5 font-display text-xl font-medium leading-snug text-bone md:text-[1.45rem]">
                  {d.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* ---------- enquiry + next ---------- */}
      <section className="border-t border-line bg-ink-2">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-6 py-14 md:grid-cols-12 md:items-center md:px-10 md:py-18">
          <div className="md:col-span-7">
            <h2 className="font-display text-[2rem] font-normal leading-[1.05] text-bone md:text-[3.4rem]">
              {live ? (
                <>Begin an enquiry about <span className="italic text-bronze-2">{project.name}.</span></>
              ) : (
                <>Interested in a project like this? <span className="italic text-bronze-2">Let's talk.</span></>
              )}
            </h2>
            <button onClick={() => onEnquire(project.slug)} className="btn-primary mt-7" data-magnetic data-cursor="link">
              {project.enquiry}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7h12M8 1l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-4 md:col-span-4 md:col-start-9">
            <button
              onClick={() => transitionTo(`/projects/${next.slug}`, next.heroImage)}
              className="card group w-full p-5 text-left transition-[border-color,translate] duration-700 hover:-translate-y-0.5 hover:border-bronze/40"
              data-cursor="explore"
            >
              <span className="text-[0.54rem] font-semibold uppercase tracking-[0.25em] text-bone/55">Next project</span>
              <span className="mt-2 flex items-center justify-between gap-3">
                <span className="font-display text-2xl font-medium text-bone">{next.name}</span>
                <span className="text-[0.58rem] tracking-[0.2em] text-bronze">{next.number}</span>
              </span>
            </button>
            <button
              onClick={backToTree}
              className="group flex items-center gap-3 text-bone/60 transition-colors hover:text-bronze-2"
              data-cursor="link"
            >
              <Logo size={26} wordmark={false} />
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em]">
                Back to the KYVAAN ecosystem
              </span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
