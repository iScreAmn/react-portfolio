import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "motion/react";
import { slideInVariants } from "../../utils/animation";
import ServiceModal from "./ServiceModal";

const ServiceItem = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Функция для открытия модального окна
  const openModal = (index) => {
    setActiveIndex(index);
  };
  // Функция для закрытия модального окна
  const closeModal = () => {
    setActiveIndex(null);
  };
  return (
    <>
      {services.map((item, index) => (
        <motion.li
          className="services-container"
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={index}
          variants={slideInVariants("top", 0.7, 50, true)}
        >
          <div className="service-card">
            <item.icon className="service-icon" />
            <h3>{item.title}</h3>
            <div className="learn-more-btn" onClick={() => openModal(index)}>
              Learn more
              <FaLongArrowAltRight className="learn-more-icon" />
            </div>
          </div>
          <ServiceModal
            item={item}
            isModalOpen={activeIndex === index}
            closeModal={closeModal}
          />
        </motion.li>
      ))}
    </>
  );
};

export default ServiceItem;
