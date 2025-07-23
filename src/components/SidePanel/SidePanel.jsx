import { useState, useEffect } from "react";
import { FaArrowUp, FaSun, FaMoon } from "react-icons/fa";
import "./SidePanel.css";

const SidePanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [theme, setTheme] = useState("light");

  // Инициализация темы
  useEffect(() => {
    const savedTheme = localStorage.getItem("saved-theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.toggle("dark-theme", savedTheme === "dark");
    }
  }, []);

  // Обработка скролла
  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Прокрутка к началу страницы
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
    localStorage.setItem("saved-theme", newTheme);
  };

  return (
    <div className={`side-panel ${isVisible ? "visible" : ""}`}>
      <button
        className="side-panel-btn theme-btn"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Переключить на темную тему" : "Переключить на светлую тему"}
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
      
      <button
        className="side-panel-btn scroll-btn"
        onClick={scrollToTop}
        aria-label="Прокрутить к началу страницы"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default SidePanel; 