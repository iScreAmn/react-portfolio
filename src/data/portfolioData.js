import {portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6, portfolio7, portfolio8, portfolio9 } from "../assets/images";

const portfolioData = [
  {
    id: 1,
    slug: "askchef",
    title: "AskChef",
    category: "Meal Planner App",
    imgSrc: portfolio1,
    href: "https://askchef.vercel.app/",
    year: "2024",
    tags: ["React", "AI assistant", "Meal planning"],
    description:
      "AskChef - a web app for weekly meal planning, recipe management, and automatic shopping lists. An AI helper suggests recipes based on the products you have.",
    gallery: [portfolio1, portfolio1, portfolio1, portfolio1],
  },
  {
    id: 2,
    slug: "lawfirm",
    title: "LawFirm",
    category: "Lawyer Bureau",
    imgSrc: portfolio2,
    href: "https://martlmsajuleba.vercel.app/ka",
    year: "2024",
    tags: ["Multi-page", "i18n", "Brand site"],
    description:
      "Multi-page website for a Georgian law firm with three languages, responsive grid blocks, and lead-focused calls to action.",
    gallery: [portfolio2, portfolio2, portfolio2, portfolio2],
  },
  {
    id: 3,
    slug: "old-tbilisi-narikala",
    title: "Old Tbilisi Narikala",
    category: "Apartment Rental",
    imgSrc: portfolio3,
    href: "https://iscreamn.github.io/apartment-otn/",
    year: "2023",
    tags: ["Landing", "Booking CTA", "Responsive"],
    description:
      "Landing for apartments in the heart of Tbilisi with atmospheric visuals, quick booking CTAs, and a mobile-first layout.",
    gallery: [portfolio3, portfolio3, portfolio3, portfolio3],
  },
  {
    id: 4,
    slug: "mesto-europe",
    title: "Mesto Europe",
    category: "Yandex Practicum",
    imgSrc: portfolio4,
    href: "https://mesto-europe.vercel.app/",
    year: "2022",
    tags: ["SPA", "Vanilla JS", "Webpack"],
    description:
      "Interactive photo sharing SPA with client-side validation, modal UX, and API integration built on vanilla JS and Webpack.",
    gallery: [portfolio4, portfolio4, portfolio4],
  },
  {
    id: 5,
    slug: "creative-space",
    title: "Creative Space",
    category: "Parallax",
    imgSrc: portfolio5,
    href: "https://iscreamn.github.io/creative-paralax/",
    year: "2023",
    tags: ["Parallax", "Scroll FX", "Creative"],
    description:
      "Promo page with parallax effects and smooth scroll animations to keep users engaged through dynamic scenes.",
    gallery: [portfolio5, portfolio5, portfolio5],
  },
  {
    id: 6,
    slug: "lafee-telegram-bot",
    title: "Telegram Bot",
    category: "LaFee Studio",
    imgSrc: portfolio6,
    href: "https://t.me/laFee_remont_dizain_bot",
    year: "2024",
    tags: ["Telegram", "grammY", "Automation"],
    description:
      "Telegram bot for LaFee Studio: interactive questionnaire, inspiration feed, and lead capture built on grammY.",
    gallery: [portfolio6, portfolio6, portfolio6],
  },
  {
    id: 7,
    slug: "ukrainian-travel",
    title: "Ukrainian Travel",
    category: "Travel Landing",
    imgSrc: portfolio7,
    href: "https://iscreamn.github.io/ukrainian-travel/",
    year: "2021",
    tags: ["Travel", "Storytelling", "Static site"],
    description:
      "Storytelling travel landing about Ukraine with lightweight layout, culture highlights, and fast loading.",
    gallery: [portfolio7, portfolio7, portfolio7],
  },
  {
    id: 8,
    slug: "burger-house",
    title: "Burger House",
    category: "Restaurant Landing",
    imgSrc: portfolio8,
    href: "https://iscreamn.github.io/burger-house-site/",
    year: "2021",
    tags: ["Restaurant", "Menu", "Order CTA"],
    description:
      "One-page restaurant site with a burger menu, accent CTAs, and currency toggle for easier orders.",
    gallery: [portfolio8, portfolio8, portfolio8],
  },
  {
    id: 9,
    slug: "geo-trip",
    title: "GeoTrip",
    category: "Travel Landing",
    imgSrc: portfolio9,
    href: "https://iscreamn.github.io/site-geo-trip/",
    year: "2022",
    tags: ["Travel", "Hero imagery", "Responsive"],
    description:
      "Travel promo about Georgia with bold hero imagery, responsive grid, and clear calls to action.",
    gallery: [portfolio9, portfolio9, portfolio9],
  },
];

export default portfolioData;