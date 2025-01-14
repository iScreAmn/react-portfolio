import "./Footer.css";
import { infoLinks, followLinks } from "../../data/footerData";
import FooterLinkGroup from "./FooterLinkGroup";

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-wrapper container">
        <div className="about-group">
          <h2>Dimitri</h2>
          <p>Frontend Developer</p>
          <a href="#about">About me</a>
        </div>
        <FooterLinkGroup title="More" links={infoLinks} isSocial={false}/>
        <div className="hr"></div>
        <FooterLinkGroup title="Follow" links={followLinks} isSocial={true}/>
        
      </div>
      <p className="footer-copyright">
        © <span className="year">{currentYear}</span> by Yandex Practicum, All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
