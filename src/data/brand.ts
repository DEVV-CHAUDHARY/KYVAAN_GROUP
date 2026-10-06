/* ============================================================
   KYVAAN GROUP — brand configuration
   Single source of truth for identity, contact and socials.
   ============================================================ */

/* ---------- LOGO --------------------------------------------
   The official KYVAAN logo is an external image asset.
   Drop the official file at:  public/assets/kyvaan-logo.png
   (or update `src` below to point at whichever file you use).

   Nothing here redraws or alters the mark. If the file is
   missing, the site falls back to the wordmark set in type —
   it never renders an invented substitute logo.
   ------------------------------------------------------------ */
export const LOGO = {
  /** Replace public/assets/kyvaan-logo.png (same filename) — no code change needed. */
  src: "/assets/kyvaan-logo.png",
  /**
   * Used only while the local file above is absent: the official logo
   * image already published on kyvaangroup.com. Set to null to disable.
   */
  fallbackSrc: "https://www.kyvaangroup.com/assets/logo.jpg" as string | null,
  alt: "KYVAAN Group",
  /** Retained for reference; no longer typeset beside the logo image. */
  wordmark: "KYVAAN GROUP",
};

/* ---------- SOCIAL ------------------------------------------
   The live KYVAAN website does not currently publish official
   Instagram / Facebook / YouTube URLs, so none are invented.

   Paste the official profile URL into `url` to activate a
   channel. Any channel left as `null` renders as an inactive
   icon labelled "Coming soon" — it never links anywhere and
   never displays a fabricated destination.
   ------------------------------------------------------------ */
export type Social = {
  id: "instagram" | "facebook" | "youtube";
  label: string;
  /** Official KYVAAN profile URL. Leave null until confirmed. */
  url: string | null;
};

export const SOCIALS: Social[] = [
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/kyvaangroup?stkn=MXdhbGRuN2JlbzZzNg==" },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/share/1Hq2WmcVj8/" },
  { id: "youtube", label: "YouTube", url: "https://youtube.com/@kyvaangroup?si=lgT-RUVj4NrESYB9" },
];

/* ---------- CONTACT -----------------------------------------
   Verified KYVAAN Group contact details.
   ------------------------------------------------------------ */
export const CONTACT = {
  email: "Info@kyvaangroup.com",
  phone: "+91 9084203961",
  phoneHref: "+919084203961",
  whatsapp: "919084203961",
  address: [
    "Behind Priyakantju Temple",
    "Burja Rd, Vrindavan",
    "Mathura — 281003, Uttar Pradesh",
  ],
};

/* ---------- BRAND VOICE ------------------------------------ */
export const BRAND = {
  name: "KYVAAN GROUP",
  /** The existing KYVAAN positioning — preserved verbatim. */
  tagline: "Real Estate · Architecture · Permanence",
  statement:
    "KYVAAN Group creates considered real estate — places with identity, lasting value and a distinctly human scale.",
  /** Hero brand film. Drop the client master at public/media/hero-kyvaan.mp4 — it takes priority. */
  heroVideoPrimary: "./media/hero-kyvaan.mp4",
  heroVideoFallback:
    "https://videos.pexels.com/video-files/36381056/15428539_3840_2160_30fps.mp4",
  heroPoster: "./images/hero-poster.jpg",
};
