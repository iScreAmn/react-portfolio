import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = ({ isMenuOpen, handleMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  const navItems = useMemo(
    () => [
      { id: "home", label: "home", type: "section" },
      { id: "about", label: "about", type: "route", path: "/about" },
      { id: "services", label: "services", type: "route", path: "/services" },
      { id: "portfolio", label: "portfolio", type: "route", path: "/portfolio" },
      { id: "hobby", label: "hobby", type: "route", path: "/hobby" },
      { id: "contact", label: "contact", type: "route", path: "/contacts" },
    ],
    []
  );

  const scrollToSection = (target) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (item, menuClick) => {
    // Принудительно сбрасываем эффект с предыдущей активной ссылки
    const prevActiveLink = document.querySelector(".nav-link.active");
    if (prevActiveLink) {
      prevActiveLink.classList.add("reset-effect");
      setTimeout(() => {
        prevActiveLink.classList.remove("reset-effect");
      }, 50);
    }

    if (item.type === "route") {
      setActiveSection(item.id);
      navigate(item.path);
      setTimeout(menuClick, 150);
      return;
    }

    setActiveSection(item.id);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: item.id } });
      setTimeout(menuClick, 300);
      return;
    }

    scrollToSection(item.id);
    setTimeout(menuClick, 300);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/services")) {
      setActiveSection("services");
      return;
    }

    if (location.pathname.startsWith("/portfolio")) {
      setActiveSection("portfolio");
      return;
    }

    if (location.pathname.startsWith("/contacts")) {
      setActiveSection("contact");
      return;
    }

    if (location.pathname.startsWith("/hobby")) {
      setActiveSection("hobby");
      return;
    }

    if (location.pathname.startsWith("/about")) {
      setActiveSection("about");
      return;
    }

    const handleScroll = () => {
      const sectionItems = navItems.filter((item) => item.type === "section");
      const sections = sectionItems.map((item) =>
        document.getElementById(item.id)
      );

      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(sectionItems[index].id);
          }
        }
      });
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname, navItems]);

  return (
    <nav className={isMenuOpen ? "nav active" : "nav"}>
      <div className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-link ${activeSection === item.id ? "active" : ""}`}
            onClick={() => handleNavClick(item, handleMenuClick)}
            data-hover-name={item.label.toUpperCase()}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Nav;