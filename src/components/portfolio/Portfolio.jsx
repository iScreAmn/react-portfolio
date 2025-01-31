import "./Portfolio.css";
import portfolioData from "../../data/portfolioData";
import SectionTitle from "../section-title/SectionTitle";
import PortfolioItem from "./PortfolioItem";

const Portfolio = () => {
  return (
    <section className="services section" id="portfolio">
      <div className="container flex-center">
        <SectionTitle title="Portfolio" subtitle="Portfolio" />
        <div className="portfolio__wrapper">
          {portfolioData.map((item, index) => {
            return <PortfolioItem key={item.id} item={item} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
