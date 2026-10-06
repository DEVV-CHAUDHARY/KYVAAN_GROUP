import { motion } from "framer-motion";
import { useState } from "react";
import { CONTACT } from "../data/brand";
import { MAPPED_PROJECTS, PROJECTS } from "../data/projects";

/** Region view around Vrindavan / Jait — the verified KYVAAN project area. */
const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4719.047664145987!2d77.63277123431286!3d27.567273942965862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736d53f89d8c11%3A0xfc9b8d0d709b5d0e!2sKyvaan%20group!5e0!3m2!1sen!2sin!4v1791285707115!5m2!1sen!2sin";

export default function MapSection({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
  const [active, setActive] = useState<string>(MAPPED_PROJECTS[0]?.slug ?? "");
  const conceptCount = PROJECTS.filter((p) => p.status === "concept").length;
  const current = MAPPED_PROJECTS.find((p) => p.slug === active);

  return (
    <section id="location" className="relative border-t border-line bg-ink pb-14 md:pb-16">
      <div className="mx-auto max-w-[1500px] px-6 pt-14 md:px-10 md:pt-18">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-bronze">06 / Location</p>
            <h2 className="mt-3 font-display text-[2.3rem] font-normal leading-[1.02] text-bone md:text-[4rem]">
              Find <span className="italic text-bronze-2">KYVAAN.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xs font-light leading-relaxed text-bone/55 md:text-right">
            KYVAAN's live projects are located in and around Vrindavan. Precise site locations are
            shared on enquiry.
          </p>
        </div>
      </div>

      <div className="relative mx-3 mt-8 h-[60vh] min-h-[420px] overflow-hidden rounded-[22px] border border-line shadow-[0_1px_2px_rgba(36,24,16,0.04),0_30px_60px_-40px_rgba(36,24,16,0.3)] md:mx-6 md:rounded-[28px] lg:mx-10">
        <iframe
          title="Map of the Vrindavan region where KYVAAN projects are located"
          src={GOOGLE_MAPS_EMBED_SRC}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-end p-5 md:items-center md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass pointer-events-auto w-full max-w-sm rounded-[20px] p-6 md:p-7"
          >
            <p className="eyebrow text-bronze">Verified locations</p>

            <div className="mt-5 divide-y divide-bone/10 border-y border-bone/10">
              {MAPPED_PROJECTS.map((p) => (
                <button
                  key={p.slug}
                  onMouseEnter={() => setActive(p.slug)}
                  onFocus={() => setActive(p.slug)}
                  onClick={() => setActive(p.slug)}
                  className="group flex w-full items-center gap-4 py-4 text-left"
                  aria-pressed={active === p.slug}
                  data-cursor="link"
                >
                  <span
                    className={`relative flex h-2.5 w-2.5 shrink-0 rounded-full transition-colors ${
                      active === p.slug ? "bg-bronze-2" : "bg-bone/30"
                    }`}
                  >
                    {active === p.slug && (
                      <span className="pulse-ring absolute inset-0 rounded-full border border-bronze" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[1.4rem] font-medium leading-tight text-bone">
                      {p.name}
                    </span>
                    <span className="block text-[0.58rem] uppercase tracking-[0.22em] text-bone/45">
                      {p.location}
                    </span>
                  </span>
                  <span className="text-[0.58rem] tracking-[0.2em] text-bronze">{p.number}</span>
                </button>
              ))}
            </div>

            {current && (
              <button
                onClick={() => onOpenProject(current.slug)}
                className="mt-6 inline-flex items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-bronze-2 transition-all duration-500 hover:gap-5"
                data-cursor="explore"
              >
                Explore {current.name}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M1 7.5h13M8 1.5l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            <p className="mt-6 border-t border-bone/10 pt-4 text-[0.56rem] leading-relaxed text-bone/40">
              <span className="block uppercase tracking-[0.2em] text-bone/55">
                KYVAAN Group office
              </span>
              <span className="mt-1.5 block">
                {CONTACT.address.map((l: string) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </p>

            <p className="mt-4 text-[0.54rem] leading-relaxed text-bone/30">
              {conceptCount} concept projects are not mapped — locations are assigned once a
              development is confirmed.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
