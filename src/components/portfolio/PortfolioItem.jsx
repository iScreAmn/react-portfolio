import { useState } from "react"
import PortfolioModal from "./PortfolioModal"


const PortfolioItem = ({item}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => {
    setIsModalOpen(true)
}
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
<div className="portfolio-img-card">
  <div className="img-card" onClick={openModal}>
      <div className="overlay"></div>
      <div className="inf">
          <h3>{item.title}</h3>
          <span>{item.category}</span>
      </div>
      <img src={item.imgSrc} alt={item.title}/> 
  </div>
  {isModalOpen && <PortfolioModal item={item} isModalOpen={isModalOpen} closeModal={closeModal} />}
  
</div>
  )
}

export default PortfolioItem