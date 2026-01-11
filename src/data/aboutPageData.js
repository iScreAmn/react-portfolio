import { FaLinkedinIn, FaInstagram, FaGithub, FaPaperPlane } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";

export const homeData = {
  greeting: "Hey, I am D.J",
  role: "Front-end Developer",
  description: "I create stunning websites for your business, Highly experienced in web design and development",
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

export const heroData = {
  eyebrow: "About",
  title: "Dimitri Jmukhadze",
  subtitle: "Front-end developer focused on fast, responsive web apps and product thinking. I design and ship modern interfaces with smooth motion, clean layout systems, and maintainable code. I care about accessibility, performance budgets, and readable design tokens for both light and dark themes.",
  subtitleSecondary: "I deliver landing pages, SaaS dashboards, promo sites, and custom UI widgets. I build design-consistent systems, animate with intent (not noise), and iterate quickly with stakeholders.",
  chips: ["Frontend", "Web apps", "Animations", "UX first", "Responsive"],
};

export const cvData = {
  downloadText: "Download CV",
  filePath: "/CV_Dimitri-Jmukhadze.pdf",
};

export const socialLinks = [
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/dimitri-jmukhadze-2048b733a/",
    ariaLabel: "LinkedIn",
  },
  {
    icon: FaGithub,
    href: "https://github.com/iScreAmn/",
    ariaLabel: "GitHub",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/d.jmukhadze/",
    ariaLabel: "Instagram",
  },
];

export const sectionLabels = {
  stack: "Stack",
  education: "Education",
  experience: "Experience",
};

