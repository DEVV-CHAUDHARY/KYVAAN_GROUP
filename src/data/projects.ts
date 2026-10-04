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
    heroImage: "./images/radhika-aerial.jpg",
    heroAlt:
      "Aerial view of Radhika Greens farm house community with private pools and green plots",
    heroVideo: null,
    gallery: [
      {
        src: "./images/radhika-villa.jpg",
        alt: "Radhika Greens luxury farmhouse exterior with private pool at golden hour",
        caption: "Farmhouse architecture — private pool living",
        span: "full",
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
      "Luxury farm plots",
      "Private pool living",
      "Open landscape setting",
      "Shaded courtyards",
    ],
    amenities: [],
    details: [
      { label: "Location", value: "Vrindavan" },
      { label: "Project type", value: "Premium farm houses" },
      { label: "Development", value: "Luxury farm plots · Private pool living" },
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
    tagline: "Planned farm community layout",
    description:
      "A planned farm community at Jait, near Vrindavan — cottages and farms within a single considered layout, designed for community living at a distinctly human scale.",
    story: [
      "At Jait, KYVAAN plans a community where cottages and farms belong to one another — a layout balancing private retreat with shared green, and individual character with collective order.",
      "The layout is drawn with patience: generous setbacks, tree-lined paths and open lawns at its centre.",
    ],
    heroImage: "./images/shriji-cottage.jpg",
    heroAlt: "Shri Ji Cottage farmhouse in green farmland at Jait, Vrindavan",
    heroVideo: null,
    gallery: [
      {
        src: "./images/shriji-layout.jpg",
        alt: "Shri Ji Cottage and Farms planned community site layout drawing",
        caption: "Site layout — a planned farm community",
        span: "full",
      },
      {
        src: "./images/shriji-greens.jpg",
        alt: "Community greens and walking paths at Shri Ji Cottage",
        caption: "Shared greens",
        span: "wide",
      },
      {
        src: "./images/shriji-cottage.jpg",
        alt: "Cottage exterior among mature trees",
        caption: "Cottages — green and quiet",
        span: "tall",
      },
    ],
    features: [
      "Planned community layout",
      "Cottages & farms",
      "Shared central greens",
      "Tree-lined paths",
    ],
    amenities: [],
    details: [
      { label: "Location", value: "Jait, Vrindavan" },
      { label: "Project type", value: "Cottage & farms" },
      { label: "Development", value: "Planned farm community layout" },
      { label: "Status", value: "Live project" },
    ],
    enquiry: "Enquire about Shri Ji Cottage",
    map: { area: "Jait, Vrindavan" },
    tint: "rgba(138,144,119,0.18)",
  },

  /* ---------------- 03–06 — concept projects ---------------- */
  {
    slug: "kyvaan-aranya",
    number: "03",
    name: "KYVAAN Aranya",
    status: "concept",
    statusLabel: "Concept Project",
    conceptNote:
      "A visual design study prepared to illustrate a direction. This is not a current or completed KYVAAN development — no location, specification, pricing or availability is implied.",
    category: "Nature-Integrated Residential",
    location: null,
    tagline: "A residential community set within dense landscape",
    description:
      "A concept study for a nature-integrated residential community — contemporary villas held within dense planting, water and natural material.",
    story: [
      "Aranya explores what happens when landscape leads and architecture follows. Villas sit low among mature planting, connected by shaded walks and water.",
      "Shown here as a design direction only, prepared ahead of a confirmed site.",
    ],
    heroImage:
      "https://images.pexels.com/photos/10610731/pexels-photo-10610731.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1900",
    heroAlt:
      "Concept visual — modern villa with glass facade, landscaped garden and water feature",
    heroVideo:
      "https://videos.pexels.com/video-files/37926050/16092910_3840_2160_24fps.mp4",
    gallery: [
      {
        src: "https://images.pexels.com/photos/35784119/pexels-photo-35784119.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — house surrounded by dense greenery beside water",
        caption: "Concept visual — dense landscape",
        span: "full",
      },
      {
        src: "https://images.pexels.com/photos/6875534/pexels-photo-6875534.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — aerial view of villas arranged around a lake",
        caption: "Concept visual — villas and water",
        span: "wide",
      },
      {
        src: "https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — villa with private pool amid planting",
        caption: "Concept visual — villa and pool",
        span: "tall",
      },
    ],
    features: [
      "Dense landscape setting",
      "Contemporary villas",
      "Natural materials",
      "Water elements",
      "Large green spaces",
    ],
    amenities: [],
    details: [
      { label: "Project type", value: "Nature-integrated residential" },
      { label: "Status", value: "Concept project" },
      { label: "Location", value: "To be confirmed" },
      { label: "Availability", value: "Not released" },
    ],
    enquiry: "Register interest",
    tint: "rgba(109,116,92,0.2)",
  },
  {
    slug: "kyvaan-aangan",
    number: "04",
    name: "KYVAAN Aangan",
    status: "concept",
    statusLabel: "Concept Project",
    conceptNote:
      "A visual design study prepared to illustrate a direction. This is not a current or completed KYVAAN development — no location, specification, pricing or availability is implied.",
    category: "Courtyard Residential",
    location: null,
    tagline: "Courtyards, stone and contemporary Indian design",
    description:
      "A concept study for a premium residential community drawn from the courtyard — the aangan — and the spatial traditions of Indian architecture.",
    story: [
      "Aangan places the courtyard back at the centre: warm stone, deep shade, landscaped internal space and light that moves across the day.",
      "Shown here as a design direction only, prepared ahead of a confirmed site.",
    ],
    heroImage:
      "https://images.pexels.com/photos/13573493/pexels-photo-13573493.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1900",
    heroAlt:
      "Concept visual — contemporary villa courtyard with warm lighting and planting",
    heroVideo: null,
    gallery: [
      {
        src: "https://images.pexels.com/photos/33681489/pexels-photo-33681489.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — carved sandstone arches and pillars",
        caption: "Concept visual — stone and shade",
        span: "full",
      },
      {
        src: "https://images.pexels.com/photos/33726340/pexels-photo-33726340.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — carved stone facade and arches",
        caption: "Concept visual — carved facade",
        span: "wide",
      },
      {
        src: "https://images.pexels.com/photos/39583696/pexels-photo-39583696.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
        alt: "Concept visual — stone colonnade with deep shadow",
        caption: "Concept visual — colonnade",
        span: "tall",
      },
    ],
    features: [
      "Courtyard architecture",
      "Warm materials and stone",
      "Natural light",
      "Landscaped internal spaces",
      "Contemporary Indian design",
    ],
    amenities: [],
    details: [
      { label: "Project type", value: "Courtyard residential" },
      { label: "Status", value: "Concept project" },
      { label: "Location", value: "To be confirmed" },
      { label: "Availability", value: "Not released" },
    ],
    enquiry: "Register interest",
    tint: "rgba(176,141,87,0.2)",
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
