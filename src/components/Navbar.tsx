import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { CONTACT } from "../data/brand";

const LINKS = [
  { label: "Ecosystem", id: "tree" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Location", id: "location" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || pathname !== "/";

  const go = (id: string) => {
    setOpen(false);
    const scroll = () =>
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
    if (pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 150);
    } else {
      scroll();
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-700 md:px-6 ${
          solid ? "pt-3" : "pt-4 md:pt-5"
        }`}
      >
        {/* floating editorial pill */}
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-line bg-ink/90 py-2 pl-4 pr-2 backdrop-blur-md transition-shadow duration-700 md:pl-6 md:pr-2.5 ${
            solid
              ? "shadow-[0_1px_2px_rgba(36,24,16,0.04),0_14px_34px_-22px_rgba(36,24,16,0.28)]"
              : "shadow-[0_1px_2px_rgba(36,24,16,0.03)]"
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center"
            aria-label="KYVAAN Group — back to top"
            data-cursor="link"
          >
            <Logo
              imgClassName="h-9 md:h-11 transition-opacity duration-700 group-hover:opacity-80"
            />
          </button>

          <nav className="hidden items-center gap-9 lg:gap-11 md:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group relative py-1 text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-bone/75 transition-colors duration-500 hover:text-bone"
                data-cursor="link"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-bronze transition-all duration-700 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => go("contact")}
              className="hidden rounded-full border border-espresso px-5 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-espresso transition-colors duration-700 hover:bg-espresso hover:text-ivory md:inline-flex"
              data-cursor="link"
            >
              Enquire
            </button>

            <button
              className="flex h-10 items-center gap-3 rounded-full border border-line px-4 md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              data-cursor="link"
            >
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-bone/80">
                Menu
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="h-px w-5 bg-bone" />
                <span className="h-px w-5 bg-bone" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink px-7 py-7"
          >
            <div className="flex items-center justify-between">
              <Logo imgClassName="h-10" />
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-bone"
                aria-label="Close menu"
                data-cursor="link"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1l14 14M15 1L1 15" />
                </svg>
              </button>
            </div>

            <nav className="mt-12 flex flex-col" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -22 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.55, ease: "easeOut" }}
                  onClick={() => go(l.id)}
                  className="group flex items-baseline gap-5 border-b border-line py-4 text-left"
                  data-cursor="link"
                >
                  <span className="text-[0.58rem] tracking-[0.28em] text-bronze">0{i + 1}</span>
                  <span className="font-display text-[2.1rem] font-medium leading-none text-bone">
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-auto flex flex-col gap-5 pt-9"
            >
              <SocialLinks size="md" />
              <div className="border-t border-bone/10 pt-5">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block text-sm font-light text-bone/70"
                  data-cursor="link"
                >
                  {CONTACT.email}
                </a>
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="mt-1.5 block text-sm font-light text-bone/70"
                  data-cursor="link"
                >
                  {CONTACT.phone}
                </a>
              </div>
              <p className="text-[0.56rem] uppercase tracking-[0.26em] text-bone/35">
                Real Estate · Architecture · Permanence
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
