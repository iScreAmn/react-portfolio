import { aboutImg } from "../../assets/images";
import { useState, useEffect } from "react";
import { fetchAboutHero } from "../../services/strapi";
import { useLocaleAboutData } from "../../hooks/useLocaleAboutData";
import "./AboutPage.css";

const AboutPage = () => {
  const aboutContent = useLocaleAboutData();
  const {
    heroData: fallbackHero,
    cvData,
    socialLinks,
    sectionLabels,
    workExperience,
    skills,
    education,
    posterAlt,
  } = aboutContent;

  const [heroData, setHeroData] = useState(fallbackHero);
  const [posterImage, setPosterImage] = useState(aboutImg);
  const [imageKey, setImageKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setHeroData(fallbackHero);

    const loadData = async () => {
      const data = await fetchAboutHero();
      if (cancelled || !data?.title) {
        return;
      }

      setHeroData({
        eyebrow: data.eyebrow,
        title: data.title,
        subtitle: data.subtitle,
        subtitleSecondary: data.subtitleSecondary,
        chips:
          typeof data.chips === "string"
            ? JSON.parse(data.chips)
            : data.chips || [],
      });

      if (data.posterImageUrl) {
        const img = new Image();
        const imageUrlWithCacheBuster = `${data.posterImageUrl}${data.posterImageUrl.includes("?") ? "&" : "?"}_nocache=${Date.now()}`;

        img.onload = () => {
          if (cancelled) return;
          setImageKey((prev) => prev + 1);
          setPosterImage(imageUrlWithCacheBuster);
        };

        img.onerror = () => {
          if (cancelled) return;
          setImageKey((prev) => prev + 1);
          setPosterImage(data.posterImageUrl);
        };

        img.src = imageUrlWithCacheBuster;
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [fallbackHero]);

  return (
    <div className="about-page">
      <section className="about-page__hero">
        <div className="about-page__container">
          <div className="about-page__content">
            <div className="about-page__eyebrow">{heroData.eyebrow}</div>
            <h1 className="about-page__title">{heroData.title}</h1>
            <p className="about-page__subtitle">
              {heroData.subtitle}
            </p>
            <p className="about-page__subtitle about-page__subtitle--secondary">
              {heroData.subtitleSecondary}
            </p>

            <div className="about-page__chips">
              {heroData.chips.map((chip) => (
                <span className="about-page__chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>

            <div className="about-page__actions">
              <a
                className="about-page__btn about-page__btn--primary"
                href={cvData.filePath}
                download
              >
                {cvData.downloadText}
              </a>
              <div className="about-page__social">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.ariaLabel}
                      className="about-page__social-btn"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.ariaLabel}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="about-page__poster">
            <img
              key={`poster-${imageKey}`}
              src={posterImage}
              alt={posterAlt}
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="about-page__details">
        <div className="about-page__container about-page__details-container">
          <div className="about-page__block about-page__block--stack">
            <div className="about-page__block-header">
              <span className="about-page__eyebrow">{sectionLabels.stack}</span>
            </div>
            <div className="about-page__tags">
              {skills.map((item) => (
                <span key={item.skill} className="about-page__tag">
                  {item.skill}
                </span>
              ))}
            </div>
          </div>

          <div className="about-page__block about-page__block--education">
            <div className="about-page__block-header">
              <span className="about-page__eyebrow">{sectionLabels.education}</span>
            </div>
            <div className="about-page__cards">
              {education.map((item) => (
                <article className="about-page__card" key={`${item.year}-${item.degree}`}>
                  <div className="about-page__card-top">
                    <span className="about-page__pill">{item.year}</span>
                    <span className="about-page__meta">{item.institution}</span>
                  </div>
                  <h3 className="about-page__card-title">{item.degree}</h3>
                </article>
              ))}
            </div>
          </div>

          <div className="about-page__block about-page__block--experience">
            <div className="about-page__block-header">
              <span className="about-page__eyebrow">{sectionLabels.experience}</span>
            </div>
            <div className="about-page__cards about-page__cards--grid">
              {workExperience.map((item) => (
                <article className="about-page__card about-page__card--exp" key={`${item.title}-${item.period}`}>
                  <div className="about-page__card-top">
                    <span className="about-page__pill">{item.period}</span>
                    <span className="about-page__meta">{item.company}</span>
                  </div>
                  <h3 className="about-page__card-title">{item.title}</h3>
                  <p className="about-page__card-text">{item.description}</p>
                  <span className="about-page__meta about-page__meta--dim">
                    {item.employmentType}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
