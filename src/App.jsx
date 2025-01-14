import { Header, Footer, Home, About, SkillsInfo, Services, Contacts, Portfolio, GetInTouch, OurClients } from "./components/index"


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
    </>
  )
}

export default App
