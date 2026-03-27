import { service1, service2, service3, abonent } from "../assets/images";

export const packages = [
  {
    name: "Standart",
    price: "from $200",
    items: ["Landings", "Mini apps", "Chat Bots"],
    accent: "starter",
    image: service1,
    text: "Quick launches, focused funnels, and micro experiences that convert. Solid build with minimal friction.",
  },
  {
    name: "Comfort",
    price: "from $600",
    items: ["Multi-page", "Multilanguage", "Online store"],
    accent: "pro",
    image: service2,
    text: "Scalable, multilingual campaigns and stores with easy CMS handoff and guided design QA.",
  },
  {
    name: "Premium",
    price: "Individual",
    items: ["Custom UX/UI", "Animations", "Full support"],
    accent: "premium",
    image: service3,
    text: "Full product partnerships: research, sprint design, advanced motion, and maintenance-ready delivery.",
  },
];

export const heroData = {
  eyebrow: "Services",
  title: "Design & Development Packages",
  subtitle: "Modern UX/UI, clear delivery, and responsive builds. Pick a package or request a bespoke flow. I handle design, animation, and front-end implementation with clean handoff and support.",
  subtitleSecondary: "Landing pages, multi-page sites, online stores, chatbots. Built with performance budgets, accessibility, and theme-ready design tokens.",
  chips: ["UX/UI", "Animations", "Responsive", "i18n", "E-commerce"],
};

export const uiTexts = {
  choosePlan: "Choose plan",
  closeButton: "Close",
  closeSymbol: "✕",
  formLabels: {
    name: "Name",
    email: "Email",
  },
  submitButton: "Request this service",
};

export const supportCtaData = {
  eyebrow: "Ongoing website support",
  title: "Need website support after launch?",
  description:
    "I also offer monthly support for websites I build, so updates, fixes, and small improvements can be handled fast without starting a new project from scratch.",
  maintenance: {
    title: "Website Maintenance",
    price: "$100/month",
    includesLabel: "Includes:",
    items: [
      "Unlimited minor edits and content adjustments",
      "Fast technical support and issue handling",
      "Content updates and ongoing improvements",
      "Small feature enhancements and fixes",
      "General maintenance (hosting support, bug fixes, and basic SEO optimization)",
    ],
  },
  image: abonent,
  imageAlt: "Website maintenance support",
};

