import { Header, Footer, Home, About, SkillsInfo, Services, Contacts, Portfolio, GetInTouch, OurClients, ScrollToTop, ThemeToggle } from "./components/index"


function App() {

  return (
    <>
    <Header/>
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
      <ScrollToTop/>
      <ThemeToggle/>
    </>
  )
}

export default App
