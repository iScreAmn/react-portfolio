import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { slideInVariants } from "../../utils/animation";

const PortfolioItem = ({ item, index }) => {
  return (
    <motion.article
      className="portfolio-img-card portfolio-grid__card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      custom={index}
      variants={slideInVariants("top", 0.4, 50, true)}
    >
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
    </motion.article>
  );
};

export default PortfolioItem;
