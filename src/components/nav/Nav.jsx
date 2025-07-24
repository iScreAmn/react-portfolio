import { useState, useEffect } from "react";
import "./Nav.css"

const Nav = ({isMenuOpen, handleMenuClick}) => {
  const items = ["home", "about", "skills", "services", "portfolio", "contact" ]
  const [activeSection, setActiveSection] = useState("home");
  
  const handleNavClick = (target, menuClick) => {
    // Принудительно сбрасываем эффект с предыдущей активной ссылки
    const prevActiveLink = document.querySelector('.nav-link.active');
    if (prevActiveLink) {
      // Добавляем временный класс для сброса эффекта
      prevActiveLink.classList.add('reset-effect');
      
      // Убираем временный класс через небольшую задержку
      setTimeout(() => {
        prevActiveLink.classList.remove('reset-effect');
      }, 50);
    }
    
    // Устанавливаем активную секцию
    setActiveSection(target);
    
    // Сразу переходим к секции
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Закрываем меню с небольшой задержкой для показа эффекта
    setTimeout(() => {
      menuClick();
    }, 300); // Задержка только для закрытия меню
  };

  // Отслеживание активной секции при прокрутке
  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.getElementById(item));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(items[index]);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <nav className={isMenuOpen ? "nav active" : "nav"}>
      <div className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
        {items.map((item, index) => (
          <button 
            key={index}
            className={`nav-link ${activeSection === item ? 'active' : ''}`}
            onClick={() => handleNavClick(item, handleMenuClick)}
            data-hover-name={item.toUpperCase()}
          >{item}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Nav