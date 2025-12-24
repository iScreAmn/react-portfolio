import { useNavigate } from "react-router-dom";
import { hobby1 } from "../../assets/images";
import "./HobbyTeaser.css";

const HobbyTeaser = () => {
  const navigate = useNavigate();

  return (
    <section className="hobby-teaser section" id="hobby">
      <div className="container hobby-teaser__container">
        <div className="hobby-teaser__content">
          <span className="hobby-teaser__eyebrow">Hobby</span>
          <h2 className="hobby-teaser__title">Drone filming & video</h2>
          <p className="hobby-teaser__text">
            I capture aerial stories with smooth, cinematic moves and clean
            edits. See more of my drone filming workflow.
          </p>
          <button
            type="button"
            className="hobby-teaser__btn"
            onClick={() => navigate("/hobby")}
          >
            View hobby
          </button>
        </div>
        <div className="hobby-teaser__thumb">
          <img src={hobby1} alt="Drone hobby preview" />
        </div>
      </div>
    </section>
  );
};

export default HobbyTeaser;

