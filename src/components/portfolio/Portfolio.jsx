import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Portfolio.css";
import portfolioData from "../../data/portfolioData";
import PortfolioItem from "./PortfolioItem";

const Portfolio = () => {
  const navigate = useNavigate();

  const chips = useMemo(() => {
    const unique = new Set();
    portfolioData.forEach((item) => {
      unique.add(item.category || "Digital");
    });
    return Array.from(unique).slice(0, 6);
  }, []);

  const handleScrollToGrid = () => {
    const grid = document.getElementById("portfolio-grid");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContact = () => {
    navigate("/", { state: { scrollTo: "contact" } });
  };

  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-hero__container">
          <div className="portfolio-hero__eyebrow">Selected work</div>
          <h1 className="portfolio-hero__title">
            Digital products and brands with sharp detail
          </h1>
          <p className="portfolio-hero__subtitle">
            Modern interfaces, clear information architecture and motion that
            supports the product story. Every card opens a detailed page with a
            gallery.
          </p>

          <div className="portfolio-hero__chips">
            {chips.map((chip) => (
              <span key={chip} className="portfolio-hero__chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="portfolio-hero__actions">
            <button
              className="portfolio-hero__btn portfolio-hero__btn--primary"
              onClick={handleScrollToGrid}
            >
              View work
            </button>
            <button
              className="portfolio-hero__btn portfolio-hero__btn--ghost"
              onClick={handleContact}
            >
              Plan a project
            </button>
          </div>
        </div>
      </section>

      <section className="portfolio-grid" id="portfolio-grid">
        <div className="portfolio-grid__container">
          <div className="portfolio-grid__list">
            {portfolioData.map((item, index) => (
              <PortfolioItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
