import { Header, Footer, Home, About, SkillsInfo, Services, Clients, Contacts, Features, Portfolio, GetInTouch } from "./components/index"


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
          <Clients/>
          <Contacts/>
          <Features/>
      </main>
      <Footer/>
    </>
  )
}

export default App
