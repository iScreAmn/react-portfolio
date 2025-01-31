import { motion } from "motion/react";
import { aboutImg } from "../../assets/images";
import SectionTitle from "../section-title/SectionTitle";
import { slideInVariants } from "../../utils/animation";
import { profList } from "../../data/profList";
import "./About.css";

const About = () => {
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
                I design and develop services for customers specializing
                creating stylish, modern websites, web services and online
                stores. My passion is to design digital user experiences through
                meaningful interactions. Check out my Portfolio
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
                  <span className="number">{item.number}</span>
                  <span className="text">{item.text}</span>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href=""
              className="inner-info-link"
              custom={3}
              variants={slideInVariants("bottom", 0.7, 60, true)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              Download
              <i className="fa-solid fa-download"></i>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
