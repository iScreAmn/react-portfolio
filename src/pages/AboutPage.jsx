import { aboutImg } from "../assets/images";
import education from "../data/education";
import workExperience from "../data/workExperience";
import skills from "../data/skills";
import "./AboutPage.css";

const chips = ["Frontend", "Web apps", "Animations", "UX first", "Responsive"];

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-page__hero">
        <div className="about-page__container">
          <div className="about-page__content">
            <div className="about-page__eyebrow">About</div>
            <h1 className="about-page__title">Dimitri Jmukhadze</h1>
            <p className="about-page__subtitle">
              Front-end developer focused on fast, responsive web apps and
              product thinking. I design and ship modern interfaces with smooth
              motion, clean layout systems, and maintainable code. I care about
              accessibility, performance budgets, and readable design tokens for
              both light and dark themes.
            </p>
            <p className="about-page__subtitle about-page__subtitle--secondary">
              I deliver landing pages, SaaS dashboards, promo sites, and custom
              UI widgets. I build design-consistent systems, animate with intent
              (not noise), and iterate quickly with stakeholders.
            </p>

            <div className="about-page__chips">
              {chips.map((chip) => (
                <span className="about-page__chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>

            <div className="about-page__actions">
              <a
                className="about-page__btn about-page__btn--primary"
                href="/CV_Dimitri-Jmukhadze.pdf"
                download
              >
                Download CV
              </a>
              <a
                className="about-page__btn about-page__btn--ghost"
                href="https://t.me/iscreamn"
                target="_blank"
                rel="noreferrer"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="about-page__poster">
            <img src={aboutImg} alt="Dimitri Jmukhadze portrait" />
          </div>
        </div>
      </section>

      <section className="about-page__details">
        <div className="about-page__container about-page__details-container">
          <div className="about-page__block about-page__block--stack">
            <div className="about-page__block-header">
              <span className="about-page__eyebrow">Stack</span>
              <h2 className="about-page__block-title">Core tools</h2>
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
              <span className="about-page__eyebrow">Learning</span>
              <h2 className="about-page__block-title">Education</h2>
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
              <span className="about-page__eyebrow">Experience</span>
              <h2 className="about-page__block-title">Work history</h2>
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

