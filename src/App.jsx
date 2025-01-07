import { Header, Footer, Home, About, SkillsInfo, Services, Contacts, Features, Portfolio, GetInTouch, OurClients } from "./components/index"


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
          <Features/>
      </main>
      <Footer/>
    </>
  )
}

export default App
