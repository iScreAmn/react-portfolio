import { Header, Footer, Home, About, SkillsInfo, Services, Contacts, Portfolio, GetInTouch, OurClients, ScrollToTop } from "./components/index"


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
    </>
  )
}

export default App
