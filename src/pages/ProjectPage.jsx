import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import portfolioData from "../data/portfolioData";
import "./ProjectPage.css";

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = portfolioData.find((item) => item.slug === slug);
  const gallery = project?.gallery?.length ? project.gallery : project ? [project.imgSrc] : [];
  const totalImages = Math.max(gallery.length, 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const thumbItems = useCallback(() => {
    if (!project || !gallery.length) return [];
    const thumbs = [];
    for (let i = 0; i < 4; i++) {
      const targetIndex = i % gallery.length;
      const src = gallery[targetIndex];
      thumbs.push({ src, targetIndex, key: `${project.slug}-thumb-${i}` });
    }
    return thumbs;
  }, [gallery, project]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentIndex(0);
  }, [slug]);

  const handleScrollToGallery = () => {
    const section = document.getElementById("project-gallery");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openModalAt = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("no-scroll");
  };

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen, showNext, showPrev]);

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
          <div className="project-gallery__layout">
            <div className="project-gallery__main-img">
              <img
                src={project.imgSrc}
                alt={`${project.title} main screenshot`}
                loading="lazy"
              />
            </div>

            <div className="project-gallery__thumbnails">
              {[0, 1].map((row) => (
                <div className="project-gallery__thumbs-row" key={`row-${row}`}>
                  {thumbItems()
                    .slice(row * 2, row * 2 + 2)
                    .map((thumb) => (
                      <button
                        type="button"
                        key={thumb.key}
                        className={`project-gallery__thumb ${
                          currentIndex === thumb.targetIndex
                            ? "project-gallery__thumb--active"
                            : ""
                        }`}
                        onClick={() => openModalAt(thumb.targetIndex)}
                        aria-label={`Open image ${thumb.targetIndex + 1}`}
                      >
                        <img
                          src={thumb.src}
                          alt={`${project.title} thumbnail ${thumb.targetIndex + 1}`}
                          loading="lazy"
                        />
                      </button>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="gallery-modal">
          <div className="gallery-modal__overlay" onClick={closeModal}></div>
          <div className="gallery-modal__content">
            <button
              type="button"
              className="gallery-modal__close"
              onClick={closeModal}
              aria-label="Close gallery"
            >
              <IoIosClose />
            </button>

            <button
              type="button"
              className="gallery-modal__nav-prev"
              onClick={showPrev}
              aria-label="Previous image"
            >
              <MdKeyboardArrowLeft />
            </button>

            <div className="gallery-modal__slide">
              <img
                src={gallery[currentIndex]}
                alt={`${project.title} full ${currentIndex + 1}`}
              />
            </div>

            <button
              type="button"
              className="gallery-modal__nav-next"
              onClick={showNext}
              aria-label="Next image"
            >
              <MdKeyboardArrowRight />
            </button>

            <div className="gallery-modal__thumbnails">
              {gallery.map((image, idx) => (
                <button
                  type="button"
                  key={`${project.slug}-modal-thumb-${idx}`}
                  className={`project-gallery__thumb ${
                    currentIndex === idx ? "project-gallery__thumb--active" : ""
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Open image ${idx + 1}`}
                >
                  <img
                    src={image}
                    alt={`${project.title} thumbnail ${idx + 1}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;

