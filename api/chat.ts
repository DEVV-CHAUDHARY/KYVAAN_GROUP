const SYSTEM_PROMPT = `
You are the official KYVAAN Group website assistant.
Brand: KYVAAN Group.
Positioning: Real Estate · Architecture · Permanence.
Phone/WhatsApp: +91 9084203961. Alternate phone: +91 9897646552.
Email: Info@kyvaangroup.com.
Office: Behind Priyakantju Temple, Burja Rd, Vrindavan, Mathura — 281003, Uttar Pradesh.
Google Maps location: KYVAAN Group, approximately 27.567273942965862, 77.63277123431286.

Answer in the user's language (Hindi, Hinglish, or English).
Be concise, warm, professional, and helpful.
Do not invent project prices, availability, approvals, possession dates, or other facts not present in the conversation.
For enquiries or booking intent, encourage contact with KYVAAN Group on WhatsApp or phone.
`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "AI assistant is not configured yet. Add OPENAI_API_KEY in Vercel." });

  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const safeMessages = messages
      .filter((m: any) => (m?.role === "user" || m?.role === "assistant") && typeof m?.content === "string")
      .slice(-12)
      .map((m: any) => ({ role: m.role, content: m.content.slice(0, 2000) }));

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5",
        instructions: SYSTEM_PROMPT,
        input: safeMessages,
        max_output_tokens: 500,
      }),
    });
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: "OpenAI request failed", details: data?.error?.message });
    const reply = data?.output_text || data?.output?.flatMap((item: any) => item?.content || []).find((c: any) => c?.type === "output_text")?.text || "Please contact the KYVAAN team on WhatsApp for assistance.";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Assistant request failed" });
  }
}
