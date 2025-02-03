import { useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const ServiceModal = ({ item, isModalOpen, closeModal }) => {
  
  const modalRef = useRef(null);

  // Функция для закрытия модального окна при клике вне его области
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal(); // Закрываем модальное окно
    }
  };

  // Добавляем обработчик события при монтировании компонента
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]); // Зависимость от isModalOpen


  
  // Обработчик для закрытия модального окна по нажатию на Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    // Добавляем обработчик, если модальное окно открыто
    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    // Удаляем обработчик при размонтировании компонента или закрытии модального окна
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]); // Зависимость от isActive

  // Если модальное окно не открыто, ничего не рендерим
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
