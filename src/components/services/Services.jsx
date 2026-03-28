import "./Services.css";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../section-title/SectionTitle";
import { useLocaleHomeData } from "../../hooks/useLocaleHomeData";

const Services = () => {
  const { servicesSectionData } = useLocaleHomeData();
  const navigate = useNavigate();
  const { gameSpotlight } = servicesSectionData;
  const PlayIcon = gameSpotlight.playButton.icon;

  const handlePlay = () => {
    navigate(gameSpotlight.playButton.path);
  };

  return (
    <section className="services section" id="services">
      <div className="container flex-center">
        <SectionTitle
          title={servicesSectionData.sectionTitle}
          subtitle={servicesSectionData.sectionSubtitle}
        />
        <div className="services__wrapper">
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
                {gameSpotlight.eyebrow}
              </motion.h4>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              >
                {gameSpotlight.subtitle}
              </motion.h3>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
              >
                {gameSpotlight.title}
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
                {gameSpotlight.playButton.text} <PlayIcon />
              </motion.button>
            </motion.div>
            <div className="services-app-img">
              <img
                src={gameSpotlight.imageSrc}
                alt={gameSpotlight.imageAlt}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
