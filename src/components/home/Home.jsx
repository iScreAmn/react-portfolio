import "./Home.css"
import { mainImg } from "../../assets/images"
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";


const Home = () => {
  return (
    <section className="home" id="home">
        <div className="container home__wrapper">
            <div className="media-icons">
                <a href="https://www.facebook.com/jmukhadze.dimitri/" target="_blank">
                    <FaFacebookF/>
                </a>
                <a href="https://www.instagram.com/d.jmukhadze/" target="_blank">
                    <FaInstagram/>
                </a>
                <a href="https://github.com/iScreAmn/" target="_blank">
                    <FaGithub/>
                </a>
            </div>
            <div className="home-info">
                <h1>Hey, I am D.J</h1>
                <h3>Front-end Developer</h3>
                <p>I create stunning websites for your business, Highly experienced in web design and development.</p>
                <a href="#" className="home-info-link inner-info-link">
                    Contact me
                    <FaRegArrowAltCircleRight />
                </a>
            </div>
            <div className="home-img">
                <img src={mainImg} alt="Profile Photo"/>
            </div>
        </div>
        <a href="#about" className="scroll-down">Scroll-Down
          <FaArrowDownLong className="arrow-icon"/>
        </a>
    </section>
  )
}

export default Home