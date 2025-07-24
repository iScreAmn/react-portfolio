import { Link } from "react-scroll"
import "./Nav.css"

const Nav = ({isMenuOpen, handleMenuClick}) => {
  const items = ["home", "about", "skills", "services", "portfolio", "contact" ]
  return (
    <nav className={isMenuOpen ? "nav active" : "nav"}>
      <div className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
        {items.map((item, index) => (
          <Link 
            to={item}
            key={index}
            className="nav-link"
            spy={true}
            smooth={true}
            offset={-80}
            duration={0}
            activeClass="active"
            onClick={handleMenuClick}
            delay={0}
          >{item}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Nav