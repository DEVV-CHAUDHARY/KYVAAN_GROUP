import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { transitionTo } from "../utils/transition";

export default function LegalPage() {
  const { pathname } = useLocation();
  const title = pathname.includes("terms") ? "Terms" : "Privacy";

  useEffect(() => {
    document.title = `${title} — KYVAAN Group`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <main className="flex min-h-screen flex-col bg-ink">
      <section className="mx-auto w-full max-w-[1500px] flex-1 px-6 pb-16 pt-32 md:px-10 md:pt-40">
        <p className="eyebrow text-bronze">KYVAAN Group</p>
        <h1 className="mt-4 font-display text-4xl font-light leading-[1.05] text-bone md:text-6xl">
          {title}
        </h1>

        <div className="mt-8 max-w-xl border-t border-bone/10 pt-8">
          <p className="text-[0.95rem] font-light leading-relaxed text-bone/65">
            KYVAAN Group's {title.toLowerCase()} documentation is being prepared and will be
            published here once finalised.
          </p>
          <p className="mt-5 text-[0.95rem] font-light leading-relaxed text-bone/65">
            In the meantime, if you have a question about this site or about an enquiry you have
            submitted, please get in touch and a member of the KYVAAN team will respond directly.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => transitionTo("/", undefined, { scrollTo: "contact" })}
              className="btn-primary"
              data-cursor="link"
            >
              Contact KYVAAN
            </button>
            <button
              onClick={() => transitionTo("/", undefined, { scrollTo: "tree" })}
              className="btn-ghost"
              data-cursor="link"
            >
              Back to KYVAAN
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
