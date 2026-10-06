import { useMemo, useRef, useState } from "react";
import { BRAND, CONTACT } from "../data/brand";

type Message = { role: "user" | "assistant"; content: string };

const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hi KYVAAN Group, I would like to know more about your projects."
)}`;

const SUGGESTIONS = [
  "Show me your projects",
  "Where is KYVAAN located?",
  "How can I contact you?",
  "I want to enquire",
];

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Namaste! 👋 I’m KYVAAN’s AI assistant. I can help you with projects, location, enquiries and contact details.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => SUGGESTIONS, []);

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

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || "Assistant unavailable");
      }

      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply.trim()
          : "I couldn't generate a reply right now. Please try again or continue on WhatsApp.";

      setMessages((current) => [
        ...current,
        { role: "assistant", content: reply },
      ]);
    } catch (error) {
      const reason =
        error instanceof Error ? error.message : "Assistant unavailable";
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `Sorry, I couldn't connect right now. ${reason} You can continue on WhatsApp for a quick response.`,
        },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-[100] flex w-[min(410px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[28px] border border-bone/10 bg-[#f8f4ec]/98 shadow-[0_30px_100px_-30px_rgba(36,24,16,0.45)] backdrop-blur-2xl md:right-6">
          <div className="relative border-b border-line bg-gradient-to-br from-[#241810] to-[#3a2619] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-bone text-espresso shadow-lg">
                <span className="font-display text-xl font-semibold">K</span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#17110d] bg-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg text-ivory">KYVAAN Assistant</p>
                <div className="mt-0.5 flex items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-ivory/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online · AI concierge
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ivory/80 transition hover:bg-white/10 hover:text-ivory"
                aria-label="Close assistant"
              >
                ×
              </button>
            </div>
          </div>

          <div className="max-h-[390px] min-h-[250px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#eadbc6] font-display text-xs text-bronze">
                    K
                  </div>
                )}
                <div
                  className={`max-w-[84%] whitespace-pre-wrap rounded-[18px] px-4 py-3 text-[0.78rem] leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "rounded-br-md bg-bone text-espresso"
                      : "rounded-bl-md border border-line bg-[#efe5d5] text-bone"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-bone/10 font-display text-xs text-bronze">
                  K
                </div>
                <div className="rounded-[18px] rounded-bl-md border border-bone/10 bg-[#efe5d5] px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bronze" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bronze [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bronze [animation-delay:240ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-line bg-[#f1e7d8]">
            <div className="flex gap-2 overflow-x-auto px-4 py-3 no-bar">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => void send(s)}
                  disabled={loading}
                  className="shrink-0 rounded-full border border-line bg-white/60 px-3 py-2 text-[0.55rem] uppercase tracking-[0.12em] text-bone/65 transition hover:border-bronze/60 hover:text-bronze disabled:opacity-40"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex gap-2 px-3 pb-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about KYVAAN…"
                autoComplete="off"
                className="min-w-0 flex-1 rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm text-bone outline-none transition placeholder:text-bone/40 focus:border-bronze/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-bone text-espresso transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <div className="flex items-center justify-between px-4 pb-4 text-[0.52rem] uppercase tracking-[0.14em] text-bone/45">
              <span>KYVAAN Group · AI concierge</span>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="text-bronze transition hover:text-bronze-2"
              >
                WhatsApp →
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-4 z-[101] flex flex-col items-end gap-3 md:right-6">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with KYVAAN Group on WhatsApp"
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-[#25D366] text-white shadow-[0_16px_45px_-18px_rgba(0,0,0,0.65)] transition duration-300 hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
            <path d="M20.5 3.5A11.8 11.8 0 0 0 12.05 0C5.55 0 .27 5.28.27 11.78c0 2.08.54 4.1 1.58 5.88L.17 24l6.49-1.7a11.8 11.8 0 0 0 5.39 1.3h.01c6.5 0 11.78-5.28 11.78-11.78 0-3.15-1.23-6.11-3.34-8.32ZM12.06 21.55h-.01a9.78 9.78 0 0 1-4.98-1.36l-.36-.21-3.85 1.01 1.03-3.75-.23-.39a9.76 9.76 0 1 1 8.4 4.7Zm5.36-7.32c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.65.15-.19.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.23-.56-.47-.49-.65-.5h-.55c-.19 0-.5.07-.77.36-.27.29-1.01.99-1.01 2.41s1.04 2.8 1.18 2.99c.15.19 2.04 3.12 4.95 4.37.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
          </svg>
        </a>

        <button
          onClick={() => {
            setOpen((v) => !v);
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
          aria-label={open ? "Close KYVAAN AI Assistant" : "Open KYVAAN AI Assistant"}
          className={`relative flex h-14 w-14 items-center justify-center rounded-[20px] border border-bone/20 bg-espresso text-ivory shadow-[0_16px_45px_-18px_rgba(0,0,0,0.65)] transition duration-300 hover:scale-105 ${open ? "rotate-3" : ""}`}
        >
          <span className="font-display text-2xl">K</span>
          {!open && <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-ink bg-emerald-400" />}
        </button>
      </div>
      <span className="sr-only">{BRAND.name} assistant</span>
    </>
  );
}
