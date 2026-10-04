import { motion } from "framer-motion";
import { useState } from "react";
import { CONTACT } from "../data/brand";
import { PROJECTS } from "../data/projects";
import SocialLinks from "./SocialLinks";

export default function ContactSection({ preselect }: { preselect?: string }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    project: preselect ?? "",
    message: "",
  });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const input =
    "w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm font-normal text-bone placeholder:text-bone/40 transition-colors duration-500 focus:border-bronze/60 focus:outline-none";

  return (
    <section id="contact" className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-14 md:grid-cols-12 md:px-10 md:py-18">
        {/* left — invitation + direct contact */}
        <div className="md:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-bronze"
          >
            07 / Enquiry
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-[2.3rem] font-normal leading-[1.02] text-bone md:text-[3.75rem]"
          >
            Have a project in mind?
            <span className="mt-1 block italic text-bronze-2">Let's begin a conversation.</span>
          </motion.h2>
          <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-bone/60">
            Tell us what you are looking for — land, a plot, a cottage, or simply a place worth
            returning to.
          </p>

          {/* verified KYVAAN contact details */}
          <motion.address
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.18 }}
            className="mt-8 border-t border-bone/10 pt-6 not-italic"
          >
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex items-center gap-3 text-sm font-light text-bone/75 transition-colors hover:text-bronze-2"
              data-cursor="link"
            >
              <MailIcon />
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="group mt-3.5 flex items-center gap-3 text-sm font-light text-bone/75 transition-colors hover:text-bronze-2"
              data-cursor="link"
            >
              <PhoneIcon />
              {CONTACT.phone}
            </a>
            <p className="mt-3.5 flex items-start gap-3 text-sm font-light leading-relaxed text-bone/60">
              <PinIcon />
              <span>
                {CONTACT.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
          </motion.address>

          {/* socials */}
          <div className="mt-8 border-t border-bone/10 pt-6">
            <p className="eyebrow text-bone/35">Follow KYVAAN</p>
            <SocialLinks size="md" className="mt-4" />
          </div>
        </div>

        {/* right — form */}
        <div className="md:col-span-7">
          {sent ? (
            <div className="card flex h-full min-h-[320px] flex-col items-center justify-center p-8 text-center">
              <svg width="38" height="38" viewBox="0 0 44 44" fill="none" stroke="#9a5e2e" strokeWidth="1.2">
                <circle cx="22" cy="22" r="20" />
                <path d="M13 22.5l6 6 12-13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="mt-6 font-display text-2xl font-light text-bone">Thank you.</h3>
              <p className="mt-3 max-w-sm text-sm font-light text-bone/60">
                Your enquiry has been received. The KYVAAN team will be in touch.
              </p>
              <button onClick={() => setSent(false)} className="btn-ghost mt-7" data-cursor="link">
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const subject = `Website Enquiry — ${form.project || "General enquiry"}`;
                const body = [
                  `Name: ${form.name}`,
                  `Phone: ${form.phone}`,
                  `Email: ${form.email}`,
                  `Project: ${form.project || "General enquiry"}`,
                  "",
                  form.message,
                ].join("\\n");
                window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                setSent(true);
              }}
              className="card grid gap-4 p-6 md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-[0.56rem] uppercase tracking-[0.24em] text-bone/50">Name</span>
                  <input required value={form.name} onChange={update("name")} placeholder="Your full name" className={input} />
                </label>
                <label>
                  <span className="mb-2 block text-[0.56rem] uppercase tracking-[0.24em] text-bone/50">Phone</span>
                  <input required type="tel" value={form.phone} onChange={update("phone")} placeholder="Phone number" className={input} />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-[0.56rem] uppercase tracking-[0.24em] text-bone/50">Email</span>
                  <input required type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" className={input} />
                </label>
                <label>
                  <span className="mb-2 block text-[0.56rem] uppercase tracking-[0.24em] text-bone/50">Project</span>
                  <select value={form.project} onChange={update("project")} className={input}>
                    <option value="" className="bg-ink">General enquiry</option>
                    {PROJECTS.map((p) => (
                      <option key={p.slug} value={p.slug} className="bg-ink">
                        {p.number} — {p.name}
                        {p.status === "concept" ? " (concept)" : ""}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span className="mb-2 block text-[0.56rem] uppercase tracking-[0.24em] text-bone/50">Message</span>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us what you are looking for…"
                  className={`${input} resize-none`}
                />
              </label>
              <button type="submit" className="btn-primary mt-1 justify-center sm:w-auto sm:self-start" data-magnetic data-cursor="link">
                Send Enquiry
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 7h12M8 1l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="text-[0.54rem] uppercase tracking-[0.2em] text-bone/30">
                Clicking Send Enquiry opens your email app addressed to Info@kyvaangroup.com.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- inline icons ---------- */
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#8f5629" strokeWidth="1.2" className="shrink-0">
    <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
    <path d="M2 4l6 4.5L14 4" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#8f5629" strokeWidth="1.2" className="shrink-0">
    <path d="M3 1.8h2.4l1.2 3-1.6 1.2a8.4 8.4 0 0 0 4 4l1.2-1.6 3 1.2V12a1.6 1.6 0 0 1-1.8 1.6A11.4 11.4 0 0 1 1.4 3.6 1.6 1.6 0 0 1 3 1.8Z" />
  </svg>
);
const PinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#8f5629" strokeWidth="1.2" className="mt-0.5 shrink-0">
    <path d="M8 14.5S13 10.4 13 6.6A5 5 0 0 0 3 6.6C3 10.4 8 14.5 8 14.5Z" />
    <circle cx="8" cy="6.5" r="1.8" />
  </svg>
);


