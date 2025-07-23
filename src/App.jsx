import { Header, Footer, Home, About, SkillsInfo, Services, Contacts, Portfolio, GetInTouch, OurClients, SidePanel } from "./components/index"


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
      <SidePanel/>
    </>
  )
}

export default App
