import "./Footer.css";
import { followLinks } from "../../data/footerData";
import FooterLinkGroup from "./FooterLinkGroup";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <footer className="footer">
      <div className="footer-wrapper container">
        <div className="about-group">
          <h2>Dimitri</h2>
          <p>Frontend Developer</p>
          <a href="#about">About me</a>
        </div>
        <FooterLinkGroup title="Follow" links={followLinks} isSocial={true}/>
      </div>
      <p className="footer-copyright">
        © <span className="year">{currentYear}</span> Made with{" "}
        <span className="heart-icon" onClick={toggleHeart}>
          {isHeartFilled ? <FaHeart /> : <FaRegHeart />}
        </span>{" "}
        by me
      </p>
    </footer>
  );
};

export default Footer;
