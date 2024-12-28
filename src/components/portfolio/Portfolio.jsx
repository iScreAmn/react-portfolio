import "./Portfolio.css"
import portfolioData from "../../data/portfolioData"
import SectionTitle from "../section-title/SectionTitle"
import PortfolioItem from "./PortfolioItem"

const Portfolio = () => {
  return (
    <section className="services section" id="portfolio">
        <div className="container flex-center">
            <SectionTitle title="Portfolio" subtitle="Portfolio" />
            <div className="portfolio__wrapper">
              {portfolioData.map(item => {
                return (
                  <PortfolioItem key={item.id} item={item}/>
                )
              })}
            </div>
        </div>
    </section>
  )
}

export default Portfolio