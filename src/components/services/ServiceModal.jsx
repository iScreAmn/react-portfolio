import { useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const ServiceModal = ({ item, isModalOpen, closeModal }) => {
  
  const modalRef = useRef(null);
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);


  
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <>
      <div className={`service-modal ${isModalOpen ? "active" : ""}`}>
        <div className="service-modal-body" ref={modalRef}>
          <FaXmark className="modal-close-btn" onClick={closeModal} />
          <h3>{item.title}</h3>
          <h4>{item.subtitle}</h4>
          <p>{item.description}</p>
          <h4>{item.text}</h4>
          <ul>
            {item.list.map((item, index) => {
              return (
                <li key={index}>
                  <FaCheckCircle />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ServiceModal;
