import { useState } from "react";
import "./Portfolio.css";
import portfolioData from "../../data/portfolioData";
import SectionTitle from "../section-title/SectionTitle";
import PortfolioItem from "./PortfolioItem";

const Portfolio = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Имитация задержки для плавности
    setTimeout(() => {
      setVisibleItems(portfolioData.length);
      setIsLoading(false);
    }, 500);
  };

  const handleShowLess = () => {
    setIsLoading(true);
    setIsHiding(true);
    // Имитация задержки для плавности
    setTimeout(() => {
      setVisibleItems(6);
      setIsLoading(false);
      setIsHiding(false);
    }, 400);
  };

  const visiblePortfolioData = portfolioData.slice(0, visibleItems);
  const hasMoreItems = visibleItems < portfolioData.length;

  return (
    <section className="services section" id="portfolio">
      <div className="container flex-center">
        <SectionTitle title="Portfolio" subtitle="Portfolio" />
        <div className="portfolio__wrapper">
          {visiblePortfolioData.map((item, index) => {
            const isLoadMoreItem = index >= 6;
            const shouldHide = isHiding && index >= 6;
            return (
              <PortfolioItem 
                key={item.id} 
                item={item} 
                index={index} 
                isLoadMoreItem={isLoadMoreItem}
                isHiding={shouldHide}
              />
            );
          })}
        </div>
        <div className="load-more-container">
          {hasMoreItems ? (
            <button 
              className="load-more-btn" 
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          ) : visibleItems > 6 ? (
            <button 
              className="load-more-btn show-less-btn" 
              onClick={handleShowLess}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Show Less"}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
