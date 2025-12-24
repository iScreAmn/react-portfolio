import { motion } from "motion/react";
import { aboutImg } from "../../assets/images";
import SectionTitle from "../section-title/SectionTitle";
import { slideInVariants } from "../../utils/animation";
import { profList } from "../../data/profList";
import AnimatedNumber from "../widgets/animatedNumber/AnimatedNumber";
import "./About.css";
import ProfileCard from "../widgets/profileCard/ProfileCard";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const goToAboutPage = () => {
    navigate("/about");
  };

  return (
    <section className="about section" id="about">
      <div className="container flex-center">
        <SectionTitle title="About me" subtitle="About me" />
        <div className="about__wrapper">
          <motion.div
            className="about-img none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={slideInVariants("left", 0.9, 100, false)}
          >
            <img src={aboutImg} alt="about" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -80 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            <ProfileCard
              name=""
              title=""
              handle="dimitri.j"
              status="Online"
              contactText="Contact Me"
              innerGradient={true}
              avatarUrl={aboutImg}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.open('https://t.me/iscreamn', '_blank')}
            />
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
                I build custom solutions for clients, focusing on crafting
                sleek, modern websites, web applications, and e-commerce
                platforms. I&apos;m driven by a passion for creating engaging
                digital experiences through thoughtful and impactful design.
                Take a look at my portfolio
              </motion.p>
            </div>
            <motion.ul 
              className="professional-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {profList.map((item, index) => (
                <motion.li
                  className="list-item"
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                >
                  <span className="number">
                    <AnimatedNumber
                      value={item.number}
                      duration={2}
                      delay={index * 0.2}
                    />
                  </span>
                  <span className="text">{item.text}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.button
              onClick={goToAboutPage}
              className="cv-btn"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>More about me</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
