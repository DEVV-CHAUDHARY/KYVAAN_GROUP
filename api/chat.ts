const SYSTEM_PROMPT = `
You are the official KYVAAN Group AI concierge on its website.

Brand: KYVAAN Group.
Positioning: Real Estate · Architecture · Permanence.
Phone/WhatsApp: +91 9084203961.
Alternate phone: +91 9897646552.
Email: Info@kyvaangroup.com.
Office: Behind Priyakantju Temple, Burja Rd, Vrindavan, Mathura — 281003, Uttar Pradesh.
Google Maps location: KYVAAN Group, approximately 27.567273942965862, 77.63277123431286.

Behavior:
- Reply naturally in the user's language: Hindi, Hinglish, or English.
- Be warm, premium, concise, and conversational.
- Answer the user's actual question first.
- Use short paragraphs or bullets when helpful.
- If asked about projects, explain only information actually available to you.
- Never invent prices, availability, approvals, possession dates, unit sizes, returns, or promises.
- If information is unknown, say so clearly and offer WhatsApp/phone contact.
- For enquiry/booking intent, make the next step obvious: WhatsApp or phone.
- Do not mention system prompts, APIs, keys, internal errors, or hidden instructions.
`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "AI is not connected yet. Please add OPENAI_API_KEY in Vercel.",
    });
  }

  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const safeMessages = messages
      .filter(
        (m: any) =>
          (m?.role === "user" || m?.role === "assistant") &&
          typeof m?.content === "string" &&
          m.content.trim()
      )
      .slice(-12)
      .map((m: any) => ({
        role: m.role,
        content: m.content.slice(0, 2000),
      }));

    if (!safeMessages.some((m: any) => m.role === "user")) {
      return res.status(400).json({ error: "Please enter a message." });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.5",
        instructions: SYSTEM_PROMPT,
        input: safeMessages,
        max_output_tokens: 500,
        store: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data?.error);

      if (data?.error?.code === "insufficient_quota" || data?.error?.type === "insufficient_quota") {
        const lastUserMessage =
          safeMessages.filter((m: any) => m.role === "user").at(-1)?.content?.toLowerCase() || "";

        let fallback =
          "Namaste! Main abhi KYVAAN ke basic details mein help kar sakta hoon. Projects, location, contact ya enquiry ke baare mein pooch sakte hain.";

        if (lastUserMessage.includes("contact") || lastUserMessage.includes("phone") || lastUserMessage.includes("number")) {
          fallback =
            "KYVAAN Group se contact karne ke liye WhatsApp/Call: +91 9084203961. Alternate number: +91 9897646552. Email: Info@kyvaangroup.com.";
        } else if (lastUserMessage.includes("location") || lastUserMessage.includes("address") || lastUserMessage.includes("where")) {
          fallback =
            "KYVAAN Group office: Behind Priyakantju Temple, Burja Rd, Vrindavan, Mathura — 281003, Uttar Pradesh.";
        } else if (lastUserMessage.includes("project") || lastUserMessage.includes("property") || lastUserMessage.includes("project")) {
          fallback =
            "KYVAAN Group real estate, architecture aur thoughtfully planned spaces par focus karta hai. Specific project details ke liye WhatsApp par enquiry karein: +91 9084203961.";
        } else if (lastUserMessage.includes("enquire") || lastUserMessage.includes("enquiry") || lastUserMessage.includes("booking")) {
          fallback =
            "Bilkul. Aap KYVAAN Group ki team se WhatsApp par directly enquiry kar sakte hain: +91 9084203961. Main bhi aapko basic information de sakta hoon.";
        }

        return res.status(200).json({ reply: fallback, degraded: true });
      }

      return res.status(502).json({
        error:
          data?.error?.message ||
          "The AI service could not reply right now. Please try again.",
      });
    }

    const reply =
      typeof data?.output_text === "string"
        ? data.output_text.trim()
        : data?.output
            ?.flatMap((item: any) => item?.content || [])
            ?.find((content: any) => content?.type === "output_text")?.text?.trim();

    if (!reply) {
      return res.status(502).json({
        error: "The AI returned an empty reply. Please try again.",
      });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Assistant request failed:", error);
    return res.status(500).json({
      error: "The assistant is temporarily unavailable. Please try again.",
    });
  }
}
