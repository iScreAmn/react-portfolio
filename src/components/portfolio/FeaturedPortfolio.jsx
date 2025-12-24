import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import portfolioData from "../../data/portfolioData";
import "./FeaturedPortfolio.css";

const FeaturedPortfolio = () => {
  const navigate = useNavigate();
  const featured = useMemo(() => portfolioData.slice(0, 3), []);

  return (
    <section className="featured-portfolio section" id="featured-portfolio">
      <div className="featured-portfolio__container">
        <div className="featured-portfolio__header">
          <div className="featured-portfolio__eyebrow">Selected work</div>
          <h2 className="featured-portfolio__title">Recent cases I’m proud of</h2>
          <p className="featured-portfolio__subtitle">
            Modern launches with attention to micro-interactions, responsive grids, and intentional copy.
            Each card links to the full case study.
          </p>
          <button
            className="featured-portfolio__btn"
            type="button"
            onClick={() => navigate("/portfolio")}
          >
            All Projects
          </button>
        </div>

        <div className="featured-portfolio__grid">
          {featured.map((item) => (
            <article
              key={item.id}
              className="featured-portfolio__card"
              onClick={() => navigate(`/portfolio/${item.slug}`)}
            >
              <div className="featured-portfolio__media">
                <img src={item.imgSrc} alt={item.title} loading="lazy" />
                <span className="featured-portfolio__category">
                  {item.category || "Project"}
                </span>
              </div>
              <div className="featured-portfolio__body">
                <h3 className="featured-portfolio__name">{item.title}</h3>
                <p className="featured-portfolio__description">{item.description}</p>
                <div className="featured-portfolio__meta">
                  <span>{item.year || "---"}</span>
                  {(item.tags || []).slice(0, 2).map((tag) => (
                    <span key={tag} className="featured-portfolio__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPortfolio;

