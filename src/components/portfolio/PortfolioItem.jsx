import { useState } from "react";
import { motion } from "motion/react";
import { slideInVariants } from "../../utils/animation";
import PortfolioModal from "./PortfolioModal";

const PortfolioItem = ({ item, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <motion.div
      className="portfolio-img-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      custom={index}
      variants={slideInVariants("top", 0.7, 50, true)}
    >
      <div className="img-card" onClick={openModal}>
        <div className="overlay"></div>
        <div className="inf">
          <h3>{item.title}</h3>
          <span>{item.category}</span>
        </div>
        <img src={item.imgSrc} alt={item.title} />
      </div>
      {isModalOpen && (
        <PortfolioModal
          item={item}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </motion.div>
  );
};

export default PortfolioItem;
