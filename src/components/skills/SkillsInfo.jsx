import { motion } from "motion/react";
import { slideInVariants } from "../../utils/animation";
import SectionTitle from "../section-title/SectionTitle";
import Awards from "./Awards";
import Education from "./Education";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import "./Skills.css";


const SkillsInfo = () => {
  return (
    <section className="skills section" id="skills">
      <div className="container flex-center">
        <SectionTitle title="Skills" subtitle="Skills" />
        <div className="inner__content">
          <motion.div
            className="skills-description"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={1}
            variants={slideInVariants("top", 0.6, 50, true)}
          >
            <h3>Education & Skills</h3>
            <p>
              For more than 5 years our experts have been accomplishing enough
              with modern Web Development, new generation web and app
              programming language.
            </p>
          </motion.div>
          <div className="skills-info education-all">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={1}
              variants={slideInVariants("top", 0.7, 50, true)}
            >
              <Education />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={2}
              variants={slideInVariants("top", 0.7, 50, true)}
            >
              <Skills />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={3}
              variants={slideInVariants("top", 0.7, 50, true)}
            >
              <Awards />
            </motion.div>
          </div>
          <WorkExperience />
        </div>
      </div>
    </section>
  );
};

export default SkillsInfo;
