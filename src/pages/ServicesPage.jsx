import { useState } from "react";
import "./ServicesPage.css";
import { service1, service2, service3 } from "../assets/images";

const packages = [
  {
    name: "Standart",
    price: "from $200",
    items: ["Landings", "Mini apps", "Chat Bots"],
    accent: "starter",
    image: service1,
    text: "Quick launches, focused funnels, and micro experiences that convert. Solid build with minimal friction.",
  },
  {
    name: "Comfort",
    price: "from $500",
    items: ["Multi-page", "Multilanguage", "Online store"],
    accent: "pro",
    image: service2,
    text: "Scalable, multilingual campaigns and stores with easy CMS handoff and guided design QA.",
  },
  {
    name: "Premium",
    price: "Individual",
    items: ["Custom UX/UI", "Animations", "Full support"],
    accent: "premium",
    image: service3,
    text: "Full product partnerships: research, sprint design, advanced motion, and maintenance-ready delivery.",
  },
];

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (pkg) => {
    setSelectedService(pkg);
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.classList.remove("no-scroll");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="services-hero__container">
          <div className="services-hero__content">
            <div className="services-hero__eyebrow">Services</div>
            <h1 className="services-hero__title">Design & Development Packages</h1>
            <p className="services-hero__subtitle">
              Modern UX/UI, clear delivery, and responsive builds. Pick a package
              or request a bespoke flow — I handle design, animation, and
              front-end implementation with clean handoff and support.
            </p>
            <p className="services-hero__subtitle services-hero__subtitle--secondary">
              Landing pages, multi-page sites, online stores, chatbots, and
              custom animations. Built with performance budgets, accessibility,
              and theme-ready design tokens.
            </p>
          </div>
          <div className="services-hero__chips">
            {["UX/UI", "Animations", "Responsive", "i18n", "E-commerce"].map(
              (chip) => (
                <span key={chip} className="services-hero__chip">
                  {chip}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="services-packages">
        <div className="services-packages__container">
          <div className="services-packages__grid">
            {packages.map((pkg) => (
              <article
                className={`services-card services-card--${pkg.accent}`}
                key={pkg.name}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="services-card__image"
                />
                <div className="services-card__header">
                  <span className="services-card__pill">{pkg.price}</span>
                  <h3 className="services-card__title">{pkg.name}</h3>
                </div>
                <ul className="services-card__list">
                  {pkg.items.map((item) => (
                    <li key={item} className="services-card__item">
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  className="services-card__btn"
                  type="button"
                  onClick={() => openModal(pkg)}
                >
                  Choose plan
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <div className="services-modal">
          <div
            className="services-modal__overlay"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="services-modal__content" role="dialog" aria-modal="true">
            <button
              type="button"
              className="services-modal__close"
              onClick={closeModal}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="services-modal__body">
              <div className="services-modal__info">
                <span className="services-modal__pill">{selectedService.price}</span>
                <h3 className="services-modal__title">{selectedService.name}</h3>
                <p className="services-modal__description">
                  {selectedService.text}
                </p>
                <ul className="services-modal__list">
                  {selectedService.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <form
                className="services-modal__form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <label className="services-modal__label">
                  Name
                  <input type="text" name="name" required />
                </label>
                <label className="services-modal__label">
                  Email
                  <input type="email" name="email" required />
                </label>
                <button className="services-modal__submit" type="submit">
                  Request this service
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;

