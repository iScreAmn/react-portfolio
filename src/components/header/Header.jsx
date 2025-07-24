import { useState, useEffect } from "react";
import "./Header.css"
import { TbMenu2 } from "react-icons/tb";
import { TbMenu3 } from "react-icons/tb";
import {RemoveScroll} from 'react-remove-scroll';
import Nav from "../nav/Nav";

const Header = ({ isMenuOpen, toggleMenu, handleMenuClick }) => {
  const [isSticky, setIsSticky] = useState(false)

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
          <a href="#" className="logo">DJ</a>
          <RemoveScroll enabled={isMenuOpen} className="remove-scroll-wrapper">
            <Nav isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
          </RemoveScroll>
          <div className="nav-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <TbMenu3/> : <TbMenu2/>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header