import { useMemo, useState } from "react";
import { BRAND, CONTACT } from "../data/brand";

type Message = { role: "user" | "assistant"; content: string };

const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hi KYVAAN Group, I would like to know more about your projects."
)}`;

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Namaste! I’m the KYVAAN Assistant. Ask me about projects, location, enquiries, or how to contact the team." },
  ]);

  const suggestions = useMemo(() => [
    "What projects do you have?",
    "Where is KYVAAN located?",
    "How can I contact you?",
  ], []);

  async function send(text = input) {
    const message = text.trim();
    if (!message || loading) return;
    setInput("");
    const next = [...messages, { role: "user" as const, content: message }];
    setMessages(next);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Assistant unavailable");
      setMessages((current) => [...current, { role: "assistant", content: data.reply || "Please contact the KYVAAN team on WhatsApp for assistance." }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "I’m temporarily unavailable. You can contact KYVAAN Group directly on WhatsApp." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-[100] w-[min(390px,calc(100vw-2rem))] overflow-hidden rounded-[24px] border border-line bg-ink shadow-[0_24px_80px_-28px_rgba(36,24,16,0.45)]">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <p className="eyebrow text-bronze">KYVAAN</p>
              <p className="mt-1 font-display text-xl text-bone">AI Assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-bone" aria-label="Close assistant">×</button>
          </div>
          <div className="max-h-[360px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "ml-auto bg-espresso text-ivory" : "border border-line bg-ink-2 text-bone"}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="w-fit rounded-2xl border border-line bg-ink-2 px-4 py-3 text-xs text-bone/55">Thinking…</div>}
          </div>
          <div className="flex gap-2 overflow-x-auto px-4 pb-3 no-bar">
            {suggestions.map((s) => <button key={s} onClick={() => send(s)} disabled={loading} className="shrink-0 rounded-full border border-line px-3 py-2 text-[0.58rem] uppercase tracking-[0.12em] text-bone/70 hover:border-bronze hover:text-bronze">{s}</button>)}
          </div>
          <div className="border-t border-line p-3">
            <form onSubmit={(e) => { e.preventDefault(); void send(); }} className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask KYVAAN…" className="min-w-0 flex-1 rounded-full border border-line bg-transparent px-4 py-3 text-sm outline-none placeholder:text-bone/35" />
              <button disabled={loading || !input.trim()} className="rounded-full bg-espresso px-4 text-xs font-semibold uppercase tracking-[0.12em] text-ivory disabled:opacity-40">Send</button>
            </form>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-2 block text-center text-[0.58rem] uppercase tracking-[0.16em] text-bronze hover:text-bronze-2">Continue on WhatsApp</a>
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-4 z-[101] flex flex-col items-end gap-3 md:right-6">
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with KYVAAN Group on WhatsApp" className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-[#25D366] text-white shadow-[0_14px_40px_-18px_rgba(36,24,16,0.55)] transition-transform hover:scale-105">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.05 0C5.55 0 .27 5.28.27 11.78c0 2.08.54 4.1 1.58 5.88L.17 24l6.49-1.7a11.8 11.8 0 0 0 5.39 1.3h.01c6.5 0 11.78-5.28 11.78-11.78 0-3.15-1.23-6.11-3.34-8.32ZM12.06 21.55h-.01a9.78 9.78 0 0 1-4.98-1.36l-.36-.21-3.85 1.01 1.03-3.75-.23-.39a9.76 9.76 0 1 1 8.4 4.7Zm5.36-7.32c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.65.15-.19.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.23-.56-.47-.49-.65-.5h-.55c-.19 0-.5.07-.77.36-.27.29-1.01.99-1.01 2.41s1.04 2.8 1.18 2.99c.15.19 2.04 3.12 4.95 4.37.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z"/></svg>
        </a>
        <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Close KYVAAN AI Assistant" : "Open KYVAAN AI Assistant"} className="flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-ivory shadow-[0_14px_40px_-18px_rgba(36,24,16,0.55)] transition-transform hover:scale-105">
          <span className="font-display text-xl">K</span>
        </button>
      </div>
      <span className="sr-only">{BRAND.name} assistant</span>
    </>
  );
}
