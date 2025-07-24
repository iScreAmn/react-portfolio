import "./Home.css";
// import lightImg from "/src/assets/images/main-img/dj-bg-transparent-2.png";

import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import { motion } from "motion/react";
import { iconVariants, slideInVariants } from "../../utils/animation";

const icons = [
  {
    id: 1,
    href: "https://www.linkedin.com/in/dimitri-jmukhadze-2048b733a/",
    icon: <FaLinkedinIn />,
  },
  {
    id: 2,
    href: "https://www.instagram.com/d.jmukhadze/",
    icon: <FaInstagram />,
  },
  { 
    id: 3, 
    href: "https://github.com/iScreAmn/", 
    icon: <FaGithub /> 
  },
];

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="container home__wrapper">
        <div className="media-icons">
          {icons.map((item, index) => (
            <motion.a
              href={item.href}
              key={item.id}
              target="_blank"
              custom={index}
              variants={iconVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </div>
        <div className="home-info">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={0}
            variants={slideInVariants("left", 0.5, 100, true)}
          >
            Hey, I am D.J
          </motion.h1>
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={1}
            variants={slideInVariants("left", 0.7, 100, true)}
          >
            Front-end Developer
          </motion.h3>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={2}
            variants={slideInVariants("left", 0.9, 100, true)}
          >
            I create stunning websites for your business, Highly experienced in
            web design and development.
          </motion.p>
          <motion.a
            href="https://t.me/iscreamn"
            target="_blank"
            className="home-info-link inner-info-link"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={2}
            variants={slideInVariants("left", 0.9, 100, true)}
          >
            Contact me
            <FaPaperPlane />
          </motion.a>
        </div>
        <div className="circle"></div>
        <motion.div
          className="home-img"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={slideInVariants("right", 0.9, 100, true)}
        >
          {/* <img src={lightImg} alt="Profile Photo" /> */}
        </motion.div>
      </div>
      <a href="#about" className="scroll-down">
        Scroll-Down
        <FaArrowDownLong className="arrow-icon" />
      </a>
    </section>
  );
};

export default Home;
