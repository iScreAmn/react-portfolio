import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { TbMenu2 } from "react-icons/tb";
import { TbMenu3 } from "react-icons/tb";
import { RemoveScroll } from "react-remove-scroll";
import Nav from "../nav/Nav";
import { useLocale } from "../../context/LocaleContext";

const Header = ({ isMenuOpen, toggleMenu, handleMenuClick }) => {
  const [isSticky, setIsSticky] = useState(false)
  const { locale, setLocale, supportedLocales } = useLocale();

  const handleScroll = () => {
    setIsSticky(window.scrollY > 0)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  

  return (
    <header className={isSticky ? "header sticky" : "header"}>
      <div className="container">
        <div className="header__wrapper">
          <Link to="/" className="logo" onClick={handleMenuClick}>
            DJ
          </Link>
          <RemoveScroll enabled={isMenuOpen} className="remove-scroll-wrapper">
            <Nav isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
          </RemoveScroll>
          <div className="header__actions">
            <div className="header__lang-switcher">
              <div className="switch">
                <input
                  id="language-toggle"
                  className="check-toggle check-toggle-round-flat"
                  type="checkbox"
                  checked={locale === supportedLocales[1]}
                  onChange={(event) => setLocale(event.target.checked ? "ru" : "en")}
                  aria-label="Toggle language"
                />
                <label htmlFor="language-toggle"></label>
                <span className="on">EN</span>
                <span className="off">RU</span>
              </div>
            </div>
            <div className="nav-menu-btn" onClick={toggleMenu}>
              {isMenuOpen ? <TbMenu3/> : <TbMenu2/>}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header