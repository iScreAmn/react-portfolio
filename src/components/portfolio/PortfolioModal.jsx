import { useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6"


const PortfolioModal = ({ item, isModalOpen, closeModal }) => {
  // Создаем ссылку на контент модального окна
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

  // Если модальное окно не открыто, ничего не рендерим
  if (!isModalOpen) return null;

  return (
    <div className={`portfolio-modal ${isModalOpen ? "active" : ""}`}>
      {/* Оверлей */}
      <div className="portfolio-modal-overlay"></div>

      {/* Контент модального окна */}
      <div className="portfolio-modal-body" ref={modalRef}>
        <FaXmark className="portfolio-close-btn" onClick={closeModal} /> {/* Иконка закрытия */}
        <h3>{item.title}</h3> {/* Заголовок */}
        <img src={item.imgSrc} alt={item.title} /> {/* Изображение */}
        <p>{item.description}</p> {/* Описание */}
        <a href="https://iscreamn.github.io/creative-paralax/" className="modal-btn">
          Explore
        </a> {/* Кнопка */}
      </div>
    </div>
  );
};


export default PortfolioModal