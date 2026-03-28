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
  { id: "home", label: "главная", type: "section" },
  { id: "about", label: "обо мне", type: "route", path: "/about" },
  { id: "services", label: "услуги", type: "route", path: "/services" },
  { id: "portfolio", label: "портфолио", type: "route", path: "/portfolio" },
  { id: "hobby", label: "хобби", type: "route", path: "/hobby" },
  { id: "contact", label: "контакты", type: "route", path: "/contacts" },
];

export const homeData = {
  greeting: "Привет, я D.J",
  role: "Front-end разработчик",
  description:
    "Делаю стильные сайты под ваш бизнес: веб-дизайн и разработка с большим опытом",
  contactButton: {
    text: "Написать мне",
    href: "https://t.me/iscreamn",
    icon: FaPaperPlane,
  },
  scrollDown: {
    text: "Далее",
    href: "#about",
    icon: FaArrowDownLong,
  },
};

export const profList = [
  {
    id: 1,
    number: "5+",
    text: "Лет опыта",
  },
  {
    id: 2,
    number: "50+",
    text: "Довольных клиентов",
  },
  {
    id: 3,
    number: "100%",
    text: "Результат",
  },
];

export const aboutSectionData = {
  sectionTitle: "Обо мне",
  sectionSubtitle: "Обо мне",
  heading: "Я - Дмитрий Джмухадзе",
  taglineRole: "Front-end разработчик",
  taglineBetween: " из ",
  taglineLocation: "Грузии",
  description:
    "Делаю кастомные решения для клиентов: современные сайты, веб-приложения и e-commerce. Мне важно создавать вовлекающий цифровой опыт через продуманный дизайн. Загляните в портфолио",
  moreAboutButton: {
    text: "Подробнее обо мне",
    path: "/about",
  },
};

export const featuredPortfolioSectionData = {
  eyebrow: "Избранное",
  title: "Недавние кейсы, которыми горжусь",
  subtitle:
    "Свежие запуски с вниманием к микровзаимодействиям, адаптивным сеткам и тексту. Каждая карточка ведёт к полному кейсу.",
  allProjectsButton: {
    text: "Все проекты",
    path: "/portfolio",
  },
  featuredCount: 3,
};

export const servicesSectionData = {
  sectionTitle: "Недавний проект",
  sectionSubtitle: "Недавний проект",
  gameSpotlight: {
    eyebrow: "Загляни",
    subtitle: "Игра моей разработки",
    title: "Flame Jumper",
    playButton: {
      text: "Играть",
      path: "/game",
      icon: IoLogoGameControllerA,
    },
    imageSrc: flameJumper,
    imageAlt: "Flame Jumper",
  },
};

export const clientsSectionData = {
  sectionTitle: "Мне доверяют",
  sectionSubtitle: "Мне доверяют",
};

export const clientsData = [
  {
    id: 1,
    imgSrc: client4,
    description:
      "Приятно было работать с Димитри. Сделал наш сайт стабильным, быстрым и полностью рабочим, отличная адаптивная вёрстка",
    name: "Леван",
    position: "Владелец Burger Bar",
  },
  {
    id: 2,
    imgSrc: client5,
    description:
      "Работали с Димитри над проектом. Его IT-решения улучшили юридические процессы, доступность и надёжность клиентской платформы",
    name: "Натия",
    position: "Менеджер GeoTrip",
  },
  {
    id: 3,
    imgSrc: client2,
    description:
      "Несколько проектов вместе с Димитри. Front-end решения усилили юридические процессы, доступность и стабильность платформы для клиентов",
    name: "Гиорги",
    position: "Главный юрист",
  },
  {
    id: 4,
    imgSrc: client1,
    description:
      "Сотрудничали полгода назад. AI-чатбот получился эффективным и профессиональным — точно под задачи компании",
    name: "Александра",
    position: "2 Sisters Designer",
  },
  {
    id: 5,
    imgSrc: client3,
    description:
      "Приятно было работать с Димитри. Сайт стабильный, быстрый, полный функционал и отличная адаптивность",
    name: "Елена",
    position: "Менеджер Old Tbilisi Narikala",
  },
];
