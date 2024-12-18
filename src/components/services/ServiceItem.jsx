import { FaLongArrowAltRight } from "react-icons/fa";
import ServiceModal from "./ServiceModal";
import { useState } from "react";

const ServiceItem = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const openModal = index => {
    setActiveIndex(index)
  }
  const closeModal = () => {
    setActiveIndex(null)
  }
  return (
    <>
      {services.map((item, index) => (
        <li className="services-container" key={index}>
          <div className="service-card">
            <item.icon className="service-icon" />
            <h3>{item.title}</h3>
            <div className="learn-more-btn" onClick={() => openModal(index)}>
              Learn more
              <FaLongArrowAltRight className="learn-more-icon" />
            </div>
          </div>
          <ServiceModal item={item} isActive={activeIndex === index} closeModal={closeModal}/>
        </li>
      ))}
    </>
  );
};

export default ServiceItem;
