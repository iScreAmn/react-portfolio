import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import portfolioData from "../data/portfolioData";
import "./ProjectPage.css";

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = portfolioData.find((item) => item.slug === slug);
  const gallery = project?.gallery?.length ? project.gallery : project ? [project.imgSrc] : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleScrollToGallery = () => {
    const section = document.getElementById("project-gallery");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!project) {
    return (
      <div className="project-page project-page--not-found">
        <div className="project-hero__container">
          <div className="project-hero__content">
            <div className="project-hero__eyebrow">Project not found</div>
            <h1 className="project-hero__title">Oops, this page is missing</h1>
            <p className="project-hero__subtitle">
              Looks like this case has not landed in the portfolio yet. Go back
              to the grid and pick another project.
            </p>
            <div className="project-hero__actions">
              <button
                className="project-hero__btn project-hero__btn--primary"
                onClick={() => navigate("/portfolio")}
              >
                All projects
              </button>
              <button
                className="project-hero__btn project-hero__btn--ghost"
                onClick={() => navigate("/", { state: { scrollTo: "contact" } })}
              >
                Contact me
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const metaChips = [
    project.category,
    project.year && `Year: ${project.year}`,
    ...(project.tags || []),
  ].filter(Boolean);

  return (
    <div className="project-page">
      <section className="project-hero">
        <div className="project-hero__container">
          <div className="project-hero__content">
            <div className="project-hero__eyebrow">
              {project.category || "Project"}
            </div>
            <h1 className="project-hero__title">{project.title}</h1>
            <p className="project-hero__subtitle">{project.description}</p>

            <div className="project-hero__meta">
              {metaChips.map((chip) => (
                <span className="project-hero__chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>

            <div className="project-hero__actions">
              <button
                className="project-hero__btn project-hero__btn--primary"
                onClick={handleScrollToGallery}
              >
                View gallery
              </button>
              {project.href && (
                <a
                  className="project-hero__btn project-hero__btn--ghost"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open live
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="project-gallery" className="project-gallery">
        <div className="project-gallery__container">
          <div className="project-gallery__grid">
            {gallery.map((image, index) => (
              <div
                key={`${project.slug}-image-${index}`}
                className={`project-gallery__item ${
                  index % 5 === 0 ? "project-gallery__item--wide" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;

