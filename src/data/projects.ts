export type ProjectStatus = "live" | "concept";

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  /** Layout hint for the editorial gallery. */
  span?: "full" | "wide" | "tall";
};

export type Project = {
  slug: string;
  number: string;
  name: string;
  status: ProjectStatus;
  /** Rendered verbatim. Concept projects must never read as real developments. */
  statusLabel: string;
  /** Long-form disclosure shown on concept project pages. */
  conceptNote: string | null;
  category: string;
  /** Only set where a verified location exists. */
  location: string | null;
  tagline: string;
  description: string;
  story: string[];
  heroImage: string;
  heroAlt: string;
  /** Cinematic video. null = awaiting client footage; the poster carries the block. */
  heroVideo: string | null;
  gallery: GalleryItem[];
  features: string[];
  amenities: string[];
  details: { label: string; value: string }[];
  enquiry: string;
  /** Verified map placement. Concept projects have none — no fake pins. */
  map?: { area: string };
  /** Per-project atmosphere used by the sticky showcase. */
  tint: string;
};

export const PROJECTS: Project[] = [
  /* ---------------- 01 — genuine KYVAAN project ---------------- */
  {
    slug: "radhika-greens",
    number: "01",
    name: "Radhika Greens",
    status: "live",
    statusLabel: "Live Project",
    conceptNote: null,
    category: "Premium Farm Houses",
    location: "Vrindavan",
    tagline: "Luxury farm plots · Private pool living",
    description:
      "KYVAAN's premium farm house community in Vrindavan — luxury farm plots shaped around private pool living, open land and quiet countryside luxury.",
    story: [
      "Radhika Greens is built around a simple idea: a farm house should feel like a place, not an address. Generous plots, considered architecture and private pool living come together in a setting defined by openness and calm.",
      "Each home is oriented to its land — framed views, shaded courtyards and a direct relationship with the countryside around it.",
    ],
    heroImage: "/images/radhika-greens-layout.jpg",
    heroAlt:
      "Official Radhika Greens plotted layout map showing numbered plots, internal roads and green open spaces",
    heroVideo: null,
    gallery: [
      {
        src: "/images/radhika-greens-layout.jpg",
        alt: "Official Radhika Greens layout plan with numbered plots, 9 m and 12 m wide roads, and green open spaces",
        caption: "Radhika Greens — official plotted layout plan",
        span: "full",
      },
      {
        src: "./images/radhika-villa.jpg",
        alt: "Radhika Greens luxury farmhouse exterior with private pool at golden hour",
        caption: "Farmhouse architecture — private pool living",
        span: "wide",
      },
      {
        src: "./images/radhika-detail.jpg",
        alt: "Sunlit stone courtyard colonnade at a Radhika Greens farmhouse",
        caption: "Courtyard and colonnade",
        span: "wide",
      },
      {
        src: "./images/radhika-aerial.jpg",
        alt: "Radhika Greens plots and tree-lined avenues from above",
        caption: "Plots and avenues",
        span: "tall",
      },
    ],
    features: [
      "Numbered plots shown in the supplied layout",
      "Internal roads marked 9.00 m wide",
      "A 12.00 m wide road shown in the layout",
      "Green open-space strips shown between plot sections",
      "Luxury farm plots",
      "Private pool living",
    ],
    amenities: [],
    details: [
      { label: "Location", value: "Vrindavan" },
      { label: "Project type", value: "Premium farm houses" },
      { label: "Development", value: "Luxury farm plots · Private pool living" },
      { label: "Layout roads shown", value: "9.00 m and 12.00 m wide" },
      { label: "Layout", value: "Numbered plots with green open-space strips" },
      { label: "Status", value: "Live project" },
    ],
    enquiry: "Enquire about Radhika Greens",
    map: { area: "Vrindavan" },
    tint: "rgba(176,141,87,0.16)",
  },

  /* ---------------- 02 — genuine KYVAAN project ---------------- */
  {
    slug: "shri-ji-cottage",
    number: "02",
    name: "Shri Ji Cottage",
    status: "live",
    statusLabel: "Live Project",
    conceptNote: null,
    category: "Cottage & Farms",
    location: "Jait, Vrindavan",
    tagline: "A peaceful cottage community in the green heart of Jait",
    description:
      "Discover Shri Ji Cottage at Jait, Vrindavan — a green, thoughtfully planned cottage and farm community with tree-lined internal avenues, a welcoming entrance and open surroundings.",
    story: [
      "Shri Ji Cottage brings together a calm countryside setting and a planned community layout at Jait, Vrindavan. The project photographs show the entrance gateway, paved internal avenues, mature trees and open plot areas.",
      "Explore the on-site views and surroundings through the project gallery. Please contact the KYVAAN team to confirm plot details, approvals, availability and transaction terms.",
    ],
    heroImage: "/images/Shri-ji%20cottage.jpg",
    heroAlt: "Shri Ji Cottage entrance and landscaped internal approach road at Jait, Vrindavan",
    heroVideo: null,
    gallery: [
      { src: "/images/IMG_0797.jpg", alt: "Shri Ji Cottage tree-lined paved internal avenue", caption: "Avenue framed by mature trees", span: "full" },
      { src: "/images/IMG_0795.jpg", alt: "Shri Ji Cottage landscaped internal road and green surroundings", caption: "Green avenues through the community", span: "wide" },
      { src: "/images/IMG_0793.jpg", alt: "Shri Ji Cottage entrance approach and internal road", caption: "Arrival and approach", span: "wide" },
      { src: "/images/IMG_0799.jpg", alt: "Shri Ji Cottage entrance gateway", caption: "The project entrance", span: "full" },
      { src: "/images/IMG_0798.jpg", alt: "Shri Ji Cottage internal avenue and site surroundings", caption: "A quieter view along the avenue", span: "wide" },
      { src: "/images/IMG_0800.jpg", alt: "Shri Ji Cottage tree-lined internal road", caption: "Tree-lined internal roads", span: "wide" },
      { src: "/images/IMG_0796.jpg", alt: "Shri Ji Cottage open plot areas and green surroundings", caption: "Open plots and green surroundings", span: "tall" },
      { src: "/images/IMG_0794.jpg", alt: "Shri Ji Cottage landscaped plot-side avenue", caption: "Landscape and plot-side views", span: "wide" },
      { src: "/images/IMG_0792.jpg", alt: "Shri Ji Cottage entrance gateway and driveway", caption: "A closer look at the entrance", span: "wide" },
      { src: "/images/IMG_0791.jpg", alt: "Shri Ji Cottage entrance gateway detail", caption: "Entrance details", span: "wide" },
    ],
    features: [
      "Cottage and farm community",
      "Tree-lined internal avenues",
      "Landscaped green surroundings",
      "Defined entrance gateway",
      "Open plots and peaceful setting",
    ],
    amenities: [],
    details: [
      { label: "Location", value: "Jait, Vrindavan" },
      { label: "Project type", value: "Cottage & farms" },
      { label: "Development", value: "Planned cottage and farm community" },
      { label: "Status", value: "Live project" },
    ],
    enquiry: "Enquire about Shri Ji Cottage",
    map: { area: "Jait, Vrindavan" },
    tint: "rgba(138,144,119,0.18)",
  },

  /* ---------------- 03–06 — concept projects ---------------- */
  /* ---------------- 03 — Shri Ji Sharnam ---------------- */
  {
    slug: "shri-ji-sharnam",
    number: "03",
    name: "Shri Ji Sharnam",
    status: "live",
    statusLabel: "Planned Residential Colony",
    conceptNote: null,
    category: "Residential Plot Development",
    location: "Bhakti Vedant Marg, Jait, Vrindavan",
    tagline: "A planned residential address near ISKCON Temple",
    description:
      "Shri Ji Sharnam is a proposed residential plot community at Jait, Vrindavan, near ISKCON Temple. The submitted layout shows organised plot blocks, wide internal roads, landscaped park space and a dedicated temple area.",
    story: [
      "Located on Bhakti Vedant Marg in Jait, Vrindavan, Shri Ji Sharnam is planned as a residential colony with clearly arranged plots and connected internal roads. The layout drawing identifies Blocks A, B and C, with road widths marked at 30, 35 and 40 feet in different sections.",
      "Plot options are being presented across a requested range of 100 to 600 gaj (square yards). The supplied plan specifically labels sample 100 sq. yd. plots as 20 ft × 45 ft. Final plot dimensions, availability, approvals and transaction terms should be confirmed with the project team before purchase.",
    ],
    heroImage: "/images/shri-ji-sharnam-plan.jpg",
    heroAlt: "Official Shri Ji Sharnam residential colony layout plan supplied in the project PDF",
    heroVideo: null,
    gallery: [
      {
        src: "/images/shri-ji-sharnam-plan.jpg",
        alt: "Official Shri Ji Sharnam residential colony layout plan supplied in the project PDF",
        caption: "Shri Ji Sharnam — official proposed colony layout",
        span: "full",
      },
      {
        src: "/images/IMG_0827%20%281%29.jpg",
        alt: "Shri Ji Sharnam site view showing prepared plot land",
        caption: "On-site plot development",
        span: "wide",
      },
      {
        src: "/images/IMG_0828%20%281%29.jpg",
        alt: "Shri Ji Sharnam view across the plotted land",
        caption: "Open plot surroundings",
        span: "wide",
      },
      {
        src: "/images/IMG_0829%20%281%29.jpg",
        alt: "Shri Ji Sharnam site and plot boundary view",
        caption: "Plot boundaries and site view",
        span: "wide",
      },
      {
        src: "/images/IMG_0830%20%281%29.jpg",
        alt: "Shri Ji Sharnam green open surroundings",
        caption: "Green open surroundings",
        span: "wide",
      },
      {
        src: "/images/IMG_0831%20%281%29.jpg",
        alt: "Shri Ji Sharnam internal site road and surrounding land",
        caption: "Site access and surroundings",
        span: "wide",
      },
    ],
    features: [
      "Residential plots from 100 to 600 gaj",
      "Near ISKCON Temple, Vrindavan",
      "Location on Bhakti Vedant Marg, Jait",
      "Planned Blocks A, B and C",
      "Internal roads marked 30, 35 and 40 feet wide",
      "Planned park and temple area",
    ],
    amenities: [
      "Planned park space",
      "Dedicated temple area shown in the layout",
      "Internal road network",
    ],
    details: [
      { label: "Location", value: "Bhakti Vedant Marg, Jait, Vrindavan" },
      { label: "Landmark", value: "Near ISKCON Temple" },
      { label: "Project type", value: "Residential plots" },
      { label: "Plot size range", value: "100–600 gaj (sq. yd.)" },
      { label: "Sample plot size", value: "100 sq. yd. (20 ft × 45 ft)" },
      { label: "Layout blocks", value: "A, B and C" },
      { label: "Road widths shown", value: "30 ft, 35 ft and 40 ft" },
      { label: "Total land area (plan)", value: "31,995.00 sq. yd." },
      { label: "Total plot area (plan)", value: "21,245.57 sq. yd." },
      { label: "Road area (plan)", value: "9,483.44 sq. yd." },
      { label: "Park + temple area (plan)", value: "1,265.99 sq. yd." },
      { label: "Status", value: "Proposed residential colony layout; verify approvals and availability" },
    ],
    enquiry: "Enquire about Shri Ji Sharnam",
    map: { area: "Bhakti Vedant Marg, Jait, Vrindavan" },
    tint: "rgba(176,141,87,0.18)",
  },
  {
    slug: "the-interval",
    number: "04",
    name: "The Interval",
    status: "live",
    statusLabel: "Restaurant",
    conceptNote: null,
    category: "Fine Multi-Cuisine Dining",
    location: null,
    tagline: "Take a pause from the everyday.",
    description:
      "The Interval is a fine multi-cuisine dining destination bringing together the bold flavours of Pan-Asian cuisine, Indian favourites, rich curries, fragrant biryani and breads fresh from the clay oven. The supplied 2026 menu also features tandoor selections, beverages and snacks, with service described as round the clock.",
    story: [
      "A welcoming place to pause, gather and enjoy a thoughtfully varied menu. Begin with smoky tandoor kebabs and crisp bites, explore vibrant Pan-Asian flavours, or settle into Indian curries, biryani and freshly prepared breads.",
      "The supplied menu presents The Interval as fine multi-cuisine dining, with tandoor, Pan-Asian, Indian, breads, beverages and snacks. Menu items and prices may change; please confirm current offerings with the restaurant."
    ],
    heroImage: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1900",
    heroAlt: "Warmly lit fine dining restaurant interior",
    heroVideo: null,
    gallery: [
      {
        src: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800",
        alt: "Elegant restaurant dining room",
        caption: "A place to pause and dine",
        span: "full"
      },
      {
        src: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400",
        alt: "Multi-course dining spread",
        caption: "A table full of flavour",
        span: "wide"
      },
      {
        src: "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400",
        alt: "Freshly prepared restaurant cuisine",
        caption: "Made for every craving",
        span: "wide"
      }
    ],
    features: [
      "Fine multi-cuisine dining",
      "Tandoor selections",
      "Pan-Asian cuisine",
      "Indian curries and biryani",
      "Fresh breads from the clay oven",
      "Beverages and snacks",
      "Menu indicates round-the-clock service"
    ],
    amenities: [],
    details: [
      { label: "Category", value: "Fine multi-cuisine dining" },
      { label: "Cuisine", value: "Tandoor · Pan-Asian · Indian" },
      { label: "Also serves", value: "Breads · Beverages · Snacks" },
      { label: "Menu edition", value: "Estimated 2026" },
      { label: "Service", value: "Round-the-clock service stated in supplied menu" }
    ],
    enquiry: "Enquire about The Interval",
    tint: "rgba(176,141,87,0.18)"
  },
  {
    slug: "kyvaan-horizon",
    number: "05",
    name: "KYVAAN Horizon",
    status: "concept",
    statusLabel: "Concept Project",
    conceptNote:
      "A visual design study prepared to illustrate a direction. This is not a current or completed KYVAAN development — no location, specification, pricing or availability is implied.",
    category: "Urban Development",
    location: null,
    tagline: "A contemporary urban address",
    description:
      "A concept study for a contemporary urban development — glass, light and a landscaped arrival within a premium city environment.",
    story: [
      "Horizon looks at the city: a clear structural idea, large glazed surfaces and a landscaped entrance that gives the building a generous threshold.",
      "Shown here as a design direction only, prepared ahead of a confirmed site.",
    ],
    heroImage:
      "https://images.pexels.com/photos/20541002/pexels-photo-20541002.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1900",
    heroAlt: "Concept visual — modern glass building at sunset",
    heroVideo:
      "https://videos.pexels.com/video-files/31470092/13418494_3840_2160_25fps.mp4",
    gallery: [
      {
        src: "https://images.pexels.com/photos/10339601/pexels-photo-10339601.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — geometric modern facade reflecting sunset light",
        caption: "Concept visual — facade geometry",
        span: "full",
      },
      {
        src: "https://images.pexels.com/photos/10384117/pexels-photo-10384117.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — glass tower reflecting the city",
        caption: "Concept visual — urban reflection",
        span: "wide",
      },
      {
        src: "https://images.pexels.com/photos/17131951/pexels-photo-17131951.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — contemporary skyscrapers at twilight",
        caption: "Concept visual — twilight",
        span: "tall",
      },
    ],
    features: [
      "Modern architecture",
      "Large glass surfaces",
      "Landscaped entrance",
      "Premium urban environment",
    ],
    amenities: [],
    details: [
      { label: "Project type", value: "Urban development" },
      { label: "Status", value: "Concept project" },
      { label: "Location", value: "To be confirmed" },
      { label: "Availability", value: "Not released" },
    ],
    enquiry: "Register interest",
    tint: "rgba(207,169,111,0.18)",
  },
  {
    slug: "kyvaan-vista",
    number: "06",
    name: "KYVAAN Vista",
    status: "concept",
    statusLabel: "Concept Project",
    conceptNote:
      "A visual design study prepared to illustrate a direction. This is not a current or completed KYVAAN development — no location, specification, pricing or availability is implied.",
    category: "Destination Development",
    location: null,
    tagline: "Open land, pavilions and long views",
    description:
      "A concept study for a premium destination development — modern structures placed lightly across open landscape, with a calm resort-like atmosphere.",
    story: [
      "Vista is about distance: low pavilions, wide lawns and architecture that gives way to the horizon rather than competing with it.",
      "Shown here as a design direction only, prepared ahead of a confirmed site.",
    ],
    heroImage:
      "https://images.pexels.com/photos/14917401/pexels-photo-14917401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1900",
    heroAlt: "Concept visual — domed poolside pavilion amid greenery",
    heroVideo:
      "https://videos.pexels.com/video-files/4125461/4125461-uhd_3840_2160_25fps.mp4",
    gallery: [
      {
        src: "https://images.pexels.com/photos/12387911/pexels-photo-12387911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — poolside terrace with long views",
        caption: "Concept visual — terrace and view",
        span: "full",
      },
      {
        src: "https://images.pexels.com/photos/261108/pexels-photo-261108.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — open landscape with water and pavilion",
        caption: "Concept visual — open landscape",
        span: "wide",
      },
      {
        src: "https://images.pexels.com/photos/261127/pexels-photo-261127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — water feature within landscaped grounds",
        caption: "Concept visual — water and grounds",
        span: "tall",
      },
    ],
    features: [
      "Large landscape",
      "Modern structures",
      "Open spaces",
      "Resort-like atmosphere",
    ],
    amenities: [],
    details: [
      { label: "Project type", value: "Destination development" },
      { label: "Status", value: "Concept project" },
      { label: "Location", value: "To be confirmed" },
      { label: "Availability", value: "Not released" },
    ],
    enquiry: "Register interest",
    tint: "rgba(138,144,119,0.16)",
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const getProjectIndex = (slug: string) => PROJECTS.findIndex((p) => p.slug === slug);
export const MAPPED_PROJECTS = PROJECTS.filter((p) => p.map);
