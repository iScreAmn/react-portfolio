import { FaPaperPlane } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import { IoLogoGameControllerA } from "react-icons/io";
import {
  client1,
  client2,
  client3,
  client4,
  client5,
  flameJumper,
} from "../../assets/images";

export const navItems = [
  { id: "home", label: "home", type: "section" },
  { id: "about", label: "about", type: "route", path: "/about" },
  { id: "services", label: "services", type: "route", path: "/services" },
  { id: "portfolio", label: "portfolio", type: "route", path: "/portfolio" },
  { id: "hobby", label: "hobby", type: "route", path: "/hobby" },
  { id: "contact", label: "contact", type: "route", path: "/contacts" },
];

export const homeData = {
  greeting: "Hey, I am D.J",
  role: "Front-end Developer",
  description:
    "I create stunning websites for your business, Highly experienced in web design and development",
  contactButton: {
    text: "Contact me",
    href: "https://t.me/iscreamn",
    icon: FaPaperPlane,
  },
  scrollDown: {
    text: "Scroll-Down",
    href: "#about",
    icon: FaArrowDownLong,
  },
};

export const profList = [
  {
    id: 1,
    number: "5+",
    text: "Years of experience",
  },
  {
    id: 2,
    number: "50+",
    text: "Happy Customers",
  },
  {
    id: 3,
    number: "100%",
    text: "Result",
  },
];

export const aboutSectionData = {
  sectionTitle: "About me",
  sectionSubtitle: "About me",
  heading: "I'm Dimitri Jmukhadze",
  taglineRole: "Front-End Developer",
  taglineBetween: " based in ",
  taglineLocation: "Georgia",
  description:
    "I build custom solutions for clients, focusing on crafting sleek, modern websites, web applications, and e-commerce platforms. I'm driven by a passion for creating engaging digital experiences through thoughtful and impactful design. Take a look at my portfolio",
  moreAboutButton: {
    text: "More about me",
    path: "/about",
  },
};

export const featuredPortfolioSectionData = {
  eyebrow: "Selected work",
  title: "Recent cases I'm proud of",
  subtitle:
    "Modern launches with attention to micro-interactions, responsive grids, and intentional copy. Each card links to the full case study.",
  allProjectsButton: {
    text: "All Projects",
    path: "/portfolio",
  },
  featuredCount: 3,
};

export const servicesSectionData = {
  sectionTitle: "Recent Project",
  sectionSubtitle: "Recent Project",
  gameSpotlight: {
    eyebrow: "Check it out",
    subtitle: "Game developed by me",
    title: "Flame Jumper",
    playButton: {
      text: "Let's Play",
      path: "/game",
      icon: IoLogoGameControllerA,
    },
    imageSrc: flameJumper,
    imageAlt: "Flame Jumper",
  },
};

export const clientsSectionData = {
  sectionTitle: "Trusted By",
  sectionSubtitle: "Trusted By",
};

export const clientsData = [
  {
    id: 1,
    imgSrc: client4,
    description:
      "Enjoyed working with Dimitri. He developed our web-page ensuring stability, speed, and full functionality with excellent responsive performance",
    name: "Levan",
    position: "Burger Bar Owner",
  },
  {
    id: 2,
    imgSrc: client5,
    description:
      "Collaborated with Dimitri on a project. His IT solutions improved legal workflows, accessibility, and client-facing platform reliability",
    name: "Natia",
    position: "GeoTrip Manager",
  },
  {
    id: 3,
    imgSrc: client2,
    description:
      "We worked with Dimitri on several projects. His frontend solutions improved legal workflows, accessibility, and client-facing platform reliability",
    name: "Giorgi",
    position: "Head Lawyer",
  },
  {
    id: 4,
    imgSrc: client1,
    description:
      "Сollaborated with Dimitri six months ago. His AI chatbot was efficient and professional. Perfectly matched our company’s exact needs",
    name: "Alexandra",
    position: "2 Sisters Designer",
  },
  {
    id: 5,
    imgSrc: client3,
    description:
      "Enjoyed working with Dimitri. He developed our web-page ensuring stability, speed, and full functionality with excellent responsive performance",
    name: "Elena",
    position: "Old Tbilisi Narikala Manager",
  },
];
