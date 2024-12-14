import { useState } from "react";
import Nav from "../nav/nav"
import "./Header.css"
import { TbMenu2 } from "react-icons/tb";
import { TbMenu3 } from "react-icons/tb";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <a href="#" className="logo">DJ</a>
          <Nav isMenuOpen={isMenuOpen} />
          <div className="nav-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <TbMenu3/> : <TbMenu2/>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header