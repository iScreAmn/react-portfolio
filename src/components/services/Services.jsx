import "./Services.css";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { flameJumper } from "../../assets/images";
import SectionTitle from "../section-title/SectionTitle";
import { IoLogoGameControllerA } from "react-icons/io";

const Services = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/game");
  };

  return (
    <section className="services section" id="services">
      <div className="container flex-center">
        <SectionTitle title="Recent Project" subtitle="Recent Project" />
        <div className="services__wrapper">
          {/* <motion.h3
            className="services-description"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={1}
            variants={slideInVariants("top", 0.7, 50, true)}
          >
            Recent Projects
          </motion.h3> */}
          <motion.div 
            className="services-app"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="services-app-content"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              >
                Check it out
              </motion.h4>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              >
                Game developed by me
              </motion.h3>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
              >
                Flame Jumper
              </motion.h2>
              <motion.button
                type="button"
                className="inner-info-link game-app"
                onClick={handlePlay}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
              >
                Let`s Play <IoLogoGameControllerA />
              </motion.button>
            </motion.div>
            <div className="services-app-img">
              <img src={flameJumper} alt="Flame Jumper" />
            </div>
          </motion.div>
          <ul className="services-list">
            {/* <ServiceItem services={services} /> */}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
