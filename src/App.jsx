import { Header, Footer, Home, About, SkillsInfo, Services, Clients, Contacts, Features, Portfolio } from "./components/index"


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
          <Clients/>
          <Contacts/>
          <Features/>
      </main>
      <Footer/>
    </>
  )
}

export default App
