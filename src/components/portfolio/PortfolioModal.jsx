import { FaXmark } from "react-icons/fa6"

const PortfolioModal = ({item, isModalOpen, closeModal}) => {
  
  return (
    <div className={`portfolio-modal ${isModalOpen ? "active":""}`}>
      <div className="portfolio-modal-body">
          <FaXmark className="portfolio-close-btn" onClick={closeModal}/>
          <i className="fa-solid fa-xmark portfolio-close-btn"></i>
          <h3>{item.title}</h3>
          <img src={item.imgSrc} alt={item.title}/>
          <p>{item.description}</p>
          <a href="https://iscreamn.github.io/creative-paralax/" className="modal-btn">Explore</a>
      </div>
    </div>
  )
}

export default PortfolioModal