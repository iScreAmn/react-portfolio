import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Home,
  About,
  Services,
  // HobbyTeaser,
  FeaturedPortfolio,
  GetInTouch,
  Clients,
} from "../components/index";
import "./HomePage.css";

const HomePage = () => {
  const location = useLocation();

  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const stateTarget = location.state?.scrollTo;
    const hashTarget = location.hash ? location.hash.replace("#", "") : null;
    const target = stateTarget || hashTarget;

    if (target) {
      // Даем маршруту отрисоваться перед прокруткой
      requestAnimationFrame(() => scrollToSection(target));

      if (stateTarget) {
        window.history.replaceState({}, document.title, location.pathname);
      }
    }
  }, [location]);

  return (
    <div className="home-page">
      <Home />
      <About />
      <FeaturedPortfolio />
      <Services />
      {/* <HobbyTeaser /> */}
      <Clients />
      <GetInTouch />
    </div>
  );
};

export default HomePage;

