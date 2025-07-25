import { motion } from "motion/react";
import { aboutImg } from "../../assets/images";
import SectionTitle from "../section-title/SectionTitle";
import { slideInVariants } from "../../utils/animation";
import { profList } from "../../data/profList";
import AnimatedNumber from "../AnimatedNumber/AnimatedNumber";
import { FaDownload } from "react-icons/fa";
import "./About.css";

const About = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV_Dimitri-Jmukhadze.pdf';
    link.download = 'CV_Dimitri-Jmukhadze.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="about section" id="about">
      <div className="container flex-center">
        <SectionTitle title="About me" subtitle="About me" />
        <div className="about__wrapper">
          <motion.div
            className="about-img"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={slideInVariants("left", 0.9, 100, false)}
          >
            <img src={aboutImg} alt="about" />
          </motion.div>
          <div className="about-info">
            <div className="description">
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                custom={0}
                variants={slideInVariants("right", 0.5, 50, true)}
              >
                I`m Dimitri Jmukhadze
              </motion.h3>
              <motion.h4
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                custom={0}
                variants={slideInVariants("left", 0.5, 50, true)}
              >
                <span>Front-End Developer</span> based in <span>Georgia</span>
              </motion.h4>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                custom={0}
                variants={slideInVariants("left", 0.5, 50, true)}
              >
                I build custom solutions for clients, focusing on crafting sleek, modern websites, web applications, and e-commerce platforms. I&apos;m driven by a passion for creating engaging digital experiences through thoughtful and impactful design. Take a look at my portfolio
              </motion.p>
            </div>
            <ul className="professional-list">
              {profList.map((item, index) => (
                <motion.li
                  className="list-item"
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  custom={index}
                  variants={slideInVariants("right", 0.6, 40, true)}
                >
                  <span className="number">
                    <AnimatedNumber value={item.number} duration={2} delay={index * 0.2} />
                  </span>
                  <span className="text">{item.text}</span>
                </motion.li>
              ))}
            </ul>
            <motion.button
              onClick={handleDownloadCV}
              className="cv-btn"
              custom={3}
              variants={slideInVariants("bottom", 0.7, 60, true)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Download CV</span>
              <FaDownload className="download-icon" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
