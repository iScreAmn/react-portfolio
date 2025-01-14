import { useState } from "react";
import Nav from "../nav/nav"
import "./Header.css"
import { TbMenu2 } from "react-icons/tb";
import { TbMenu3 } from "react-icons/tb";
import {RemoveScroll} from 'react-remove-scroll';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleMenuClick = () => {
    setIsMenuOpen(false)
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <a href="#" className="logo">DJ</a>
          <RemoveScroll enabled={isMenuOpen}>
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