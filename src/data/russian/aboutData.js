import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import cvFile from "../../assets/docs/Dimitri_Jmukhadze_CV.pdf";

export const heroData = {
  eyebrow: "Обо мне",
  title: "Дмитрий Джмухадзе",
  subtitle:
    "Front-end разработчик: быстрые и отзывчивые веб-приложения и продуктовое мышление. Проектирую и внедряю современные интерфейсы с плавной анимацией, выстроенной сеткой и поддерживаемым кодом. Уделяю внимание доступности, performance budget и понятным дизайн-токенам для светлой и тёмной темы.",
  subtitleSecondary:
    "Делаю интерфейсы вокруг пользователя: от SaaS-дашбордов до промо-платформ и кастомных UI-компонентов. В работе сочетаю единые дизайн-системы, осмысленный motion и быстрые итерации вместе с командой.",
  chips: ["Frontend", "Веб-приложения", "Интеграции", "UX", "API"],
};

export const posterAlt = "Портрет Димитри Джмухадзе";

export const cvData = {
  downloadText: "Скачать CV",
  filePath: cvFile,
};

export const socialLinks = [
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/dimitri-jmukhadze-2048b733a/",
    ariaLabel: "Профиль в LinkedIn",
  },
  {
    icon: FaGithub,
    href: "https://github.com/iScreAmn/",
    ariaLabel: "Профиль на GitHub",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/d.jmukhadze/",
    ariaLabel: "Профиль в Instagram",
  },
];

export const sectionLabels = {
  stack: "Стек",
  education: "Образование",
  experience: "Опыт",
};

export const workExperience = [
  {
    title: "Georgian Polygraph Services",
    employmentType: "Полный день | Офис",
    period: "2025 - 2026",
    company: "Full Stack разработчик",
    description:
      "Разрабатываю веб-приложения, которые помогают бизнесу работать эффективнее. Пишу код для интеграции с банковскими платёжными системами и автоматизации финансовых процессов.",
  },
  {
    title: "Веб-разработчик",
    employmentType: "Фриланс",
    period: "2020 - 2025",
    company: "Фриланс",
    description:
      "Как фрилансер сотрудничал с компаниями над кастомными веб-приложениями и интерфейсами. Фокус на практичных решениях, интеграции сторонних сервисов и быстрых итерациях по обратной связи пользователей.",
  },
  {
    title: "Системный инженер",
    employmentType: "Полный день | Удалённо",
    period: "2019 - 2020",
    company: "Creative Space",
    description:
      "Работал с программными средами и сетевой инфраструктурой: развёртывание, настройка, мониторинг и оптимизация. Обеспечивал стабильную работу, безопасность и бесперебойность сервисов.",
  },
];

export const skills = [
  { skill: "JavaScript", level: "" },
  { skill: "React", level: "" },
  { skill: "Next.js", level: "" },
  { skill: "Node.js", level: "" },
  { skill: "Express.js", level: "" },
  { skill: "CSS", level: "" },
  { skill: "Vue", level: "" },
  { skill: "TypeScript", level: "" },
  { skill: "GIT", level: "" },
  { skill: "AI Automation", level: "" },
];

export const education = [
  {
    year: "2024-2025",
    degree: "Backend и Docker",
    institution: "Microsoft Academy",
  },
  {
    year: "2023-2024",
    degree: "Frontend-разработка",
    institution: "Practicum Academy",
  },
  {
    year: "2019-2020",
    degree: "Веб-разработка",
    institution: "Институт информационных технологий",
  },
  {
    year: "2017-2018",
    degree: "Сетевой инженер и системный администратор",
    institution: "Pulsar IT Academy",
  },
];

export const awards = [
  {
    year: "2020-2022",
    title: "Frontend-разработчик",
    institution: "Юридическая фирма «მართსაჯულება»",
  },
  {
    year: "2024-2025",
    title: "Веб-разработчик",
    institution: "Фриланс",
  },
];
