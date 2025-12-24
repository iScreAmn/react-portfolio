import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Header, Footer, SidePanel } from "./components/index";
import HomePage from "./pages/HomePage";
import Portfolio from "./components/portfolio/Portfolio";
import ProjectPage from "./pages/ProjectPage";
import GamePage from "./pages/GamePage";
import AboutPage from "./pages/AboutPage";
import HobbyPage from "./pages/HobbyPage";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    handleMenuClick();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        handleMenuClick={handleMenuClick}
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/hobby" element={<HobbyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <SidePanel isMenuOpen={isMenuOpen} />
    </>
  );
}

export default App;
