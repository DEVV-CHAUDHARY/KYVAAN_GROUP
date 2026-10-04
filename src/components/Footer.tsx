import { useNavigate } from "react-router-dom";
import { CONTACT } from "../data/brand";
import { PROJECTS } from "../data/projects";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

const NAV = [
  { label: "Ecosystem", id: "tree" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Location", id: "location" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const navigate = useNavigate();

  const go = (id: string) => {
    navigate("/");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 90);
  };

  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1500px] px-6 py-12 md:px-10 md:py-14">
        <div className="grid gap-9 md:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-4">
            <Logo imgClassName="h-11" />
            <p className="mt-5 max-w-xs text-xs font-normal leading-relaxed text-bone/60">
              Considered real estate — places with identity, lasting value and a distinctly human
              scale.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          {/* navigate */}
          <nav className="md:col-span-2" aria-label="Footer">
            <p className="eyebrow text-bone/35">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="text-[0.8rem] font-light text-bone/55 transition-colors hover:text-bronze-2"
                    data-cursor="link"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* projects */}
          <div className="md:col-span-3">
            <p className="eyebrow text-bone/35">Projects</p>
            <ul className="mt-4 space-y-2.5">
              {PROJECTS.map((p) => (
                <li key={p.slug}>
                  <button
                    onClick={() => navigate(`/projects/${p.slug}`)}
                    className="group flex items-baseline gap-2.5 text-left"
                    data-cursor="link"
                  >
                    <span className="text-[0.56rem] tracking-[0.2em] text-bronze">{p.number}</span>
                    <span className="text-[0.8rem] font-light text-bone/55 transition-colors group-hover:text-bronze-2">
                      {p.name}
                    </span>
                    {p.status === "concept" && (
                      <span className="text-[0.5rem] uppercase tracking-[0.16em] text-bone/30">
                        Concept
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="md:col-span-3">
            <p className="eyebrow text-bone/35">Contact</p>
            <address className="mt-4 not-italic">
              <a
                href={`mailto:${CONTACT.email}`}
                className="block text-[0.8rem] font-light text-bone/55 transition-colors hover:text-bronze-2"
                data-cursor="link"
              >
                {CONTACT.email}
              </a>
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="mt-2 block text-[0.8rem] font-light text-bone/55 transition-colors hover:text-bronze-2"
                data-cursor="link"
              >
                {CONTACT.phone}
              </a>
              <p className="mt-3 text-[0.75rem] font-light leading-relaxed text-bone/40">
                {CONTACT.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 md:flex-row">
          <p className="text-[0.54rem] uppercase tracking-[0.2em] text-bone/30">
            © {new Date().getFullYear()} KYVAAN Group · Real Estate · Architecture · Permanence
          </p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/privacy")}
              className="text-[0.54rem] uppercase tracking-[0.2em] text-bone/35 transition-colors hover:text-bronze-2"
              data-cursor="link"
            >
              Privacy
            </button>
            <button
              onClick={() => navigate("/terms")}
              className="text-[0.54rem] uppercase tracking-[0.2em] text-bone/35 transition-colors hover:text-bronze-2"
              data-cursor="link"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
