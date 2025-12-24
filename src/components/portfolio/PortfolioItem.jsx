import { Link } from "react-router-dom";

const PortfolioItem = ({ item, index }) => {
  return (
    <article className="portfolio-img-card portfolio-grid__card">
      <Link
        to={`/portfolio/${item.slug}`}
        className="portfolio-card__link"
        aria-label={`Открыть проект ${item.title}`}
      >
        <div className="img-card">
          <div className="overlay" />
          <div className="inf">
            <h3 className="portfolio-card__title">{item.title}</h3>
            <span className="portfolio-card__category">
              {item.category || "Project"}
            </span>
          </div>
          <img src={item.imgSrc} alt={item.title} />
        </div>
      </Link>
    </article>
  );
};

export default PortfolioItem;
