// Brand colors as CSS custom property values
export const COLORS = {
  void: "#060D07",
  abyss: "#111C12",
  forest: "#2D4A2F",
  gold: "#C4973A",
  goldBright: "#E8B84B",
  cream: "#F2EDE3",
  charcoal: "#2A2A2A",
} as const;

// Navigation links
export const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "SCIENCE", href: "/science" },
  { label: "PRODUCT", href: "/product" },
  { label: "ABOUT", href: "/about" },
  { label: "RESEARCH", href: "/research" },
] as const;

// Waitlist interest options
export const WAITLIST_INTERESTS = [
  "B12 & D3",
  "Women's Health",
  "Children's Nutrition",
  "General Wellness",
] as const;

// Home page FAQ items
export const FAQ_ITEMS = [
  {
    question: "What is Ahara?",
    answer:
      "Ahara is an early-stage nutraceutical startup building science-backed nutritional products for vegetarian diets. Our first product targets Vitamin B12 and D3 — the two nutrients most consistently missing from plant-based eating.",
  },
  {
    question: "How is this different from a regular supplement?",
    answer:
      "Most supplements add vitamins and stop there. Ahara's formula includes whole-food ingredients — sattu, almonds, sesame, turmeric, berries — each chosen because it plays a specific role in helping your body absorb those vitamins. We design around absorption, not just dosage.",
  },
  {
    question: "Is the Vitamin D3 suitable for vegetarians and vegans?",
    answer:
      "Yes. Our D3 is sourced from lichen — a plant-based source. Most D3 supplements use lanolin (from sheep's wool). Ours doesn't.",
  },
  {
    question: "How do I take it?",
    answer:
      "One serving per day. Stir into curd, sprinkle on khakhra, or mix with warm water. It fits into what you're already eating.",
  },
  {
    question: "When can I buy it?",
    answer:
      "We're currently in the development and validation phase. Join the waitlist and we'll reach out first when we're ready to launch.",
  },
  {
    question: "Can I invest in or partner with Ahara?",
    answer:
      "Absolutely — we're open to those conversations. Email us at hello@ahara.co",
  },
] as const;
