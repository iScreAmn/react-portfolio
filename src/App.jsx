import { useState } from "react";
import { Header, Footer, Home, About, SkillsInfo, Services, Contacts, Portfolio, GetInTouch, OurClients, SidePanel } from "./components/index"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
    <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} handleMenuClick={handleMenuClick}/>
      <main>
          <Home/>
          <About/>
          <SkillsInfo/>
          <Services/>
          <Portfolio/>
          <GetInTouch/>
          <OurClients/>
          <Contacts/>
      </main>
      <Footer/>
      <SidePanel isMenuOpen={isMenuOpen}/>
    </>
  )
}

export default App
