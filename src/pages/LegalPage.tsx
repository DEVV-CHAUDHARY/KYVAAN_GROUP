import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { CONTACT } from "../data/brand";
import { transitionTo } from "../utils/transition";

export default function LegalPage() {
  const { pathname } = useLocation();
  const isTerms = pathname.includes("terms");
  const title = isTerms ? "Terms of Use" : "Privacy Policy";

  useEffect(() => {
    document.title = title + " — KYVAAN Group";
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <main className="flex min-h-screen flex-col bg-ink">
      <section className="mx-auto w-full max-w-[1500px] flex-1 px-6 pb-16 pt-32 md:px-10 md:pt-40">
        <p className="eyebrow text-bronze">KYVAAN Group</p>
        <h1 className="mt-4 font-display text-4xl font-light leading-[1.05] text-bone md:text-6xl">{title}</h1>
        <div className="mt-8 max-w-3xl space-y-7 border-t border-bone/10 pt-8 text-[0.95rem] font-light leading-relaxed text-bone/65">
          {isTerms ? (
            <>
              <p>These terms describe general conditions for using the KYVAAN Group website. Please use the website lawfully and do not attempt to disrupt its operation or security.</p>
              <section>
                <h2 className="mb-2 font-display text-xl text-bone">Website information</h2>
                <p>Content is provided for general information and enquiry purposes. Project descriptions, images, layouts and visualisations may be illustrative. Any project labelled as a concept is a design study and must not be treated as an available, approved or completed development.</p>
              </section>
              <section>
                <h2 className="mb-2 font-display text-xl text-bone">No offer or guarantee</h2>
                <p>Website content is not a binding offer, investment advice, guarantee of returns, or promise about pricing, availability, approvals, specifications or completion dates. Such details must be confirmed directly by KYVAAN Group in relevant written documentation.</p>
              </section>
              <section>
                <h2 className="mb-2 font-display text-xl text-bone">Third-party services</h2>
                <p>Website features may open third-party services, including WhatsApp and an AI assistant. Those services are subject to their own terms and privacy practices. We cannot guarantee uninterrupted availability of third-party services.</p>
              </section>
              <section>
                <h2 className="mb-2 font-display text-xl text-bone">Contact</h2>
                <p>Questions about these terms can be sent to <a className="text-bronze-2 underline" href={"mailto:" + CONTACT.email}>{CONTACT.email}</a>.</p>
              </section>
            </>
          ) : (
            <>
              <p>This notice explains in general terms how information you choose to provide through the KYVAAN Group website may be handled. Contact us if you need clarification about a specific enquiry.</p>
              <section>
                <h2 className="mb-2 font-display text-xl text-bone">Information you provide</h2>
                <p>If you make an enquiry, you may provide your name, phone number, email address, project of interest and message. The website enquiry form prepares a message in WhatsApp; you must review and send that message yourself. Please do not include information you do not wish to share.</p>
              </section>
              <section>
                <h2 className="mb-2 font-display text-xl text-bone">AI assistant</h2>
                <p>If you use the website assistant, the text you submit may be processed by the configured AI provider to generate a reply. Avoid entering passwords, payment details or other sensitive personal information. Third-party providers may process information under their own terms and policies.</p>
              </section>
              <section>
                <h2 className="mb-2 font-display text-xl text-bone">Use of information</h2>
                <p>Information you voluntarily send may be used to respond to your enquiry, discuss relevant projects and provide requested follow-up. Contact KYVAAN Group to ask about information you have submitted or applicable retention practices.</p>
              </section>
              <section>
                <h2 className="mb-2 font-display text-xl text-bone">Third parties and security</h2>
                <p>WhatsApp, hosting providers and AI services may process information when you use related website features. No internet transmission can be guaranteed completely secure; please share information thoughtfully.</p>
              </section>
              <section>
                <h2 className="mb-2 font-display text-xl text-bone">Privacy questions</h2>
                <p>For privacy questions or requests concerning information you have sent, contact <a className="text-bronze-2 underline" href={"mailto:" + CONTACT.email}>{CONTACT.email}</a>.</p>
              </section>
              <p className="text-xs text-bone/45">This is a general website privacy notice and should be reviewed against the business's actual data practices and applicable legal requirements before launch.</p>
            </>
          )}
          <div className="flex flex-wrap gap-4 pt-2">
            <button onClick={() => transitionTo("/", undefined, { scrollTo: "contact" })} className="btn-primary" data-cursor="link">Contact KYVAAN</button>
            <button onClick={() => transitionTo("/", undefined, { scrollTo: "tree" })} className="btn-ghost" data-cursor="link">Back to KYVAAN</button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
