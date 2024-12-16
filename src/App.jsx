import { Header, Footer, Home, About, Clients, Contacts, Features, Portfolio, Services, Skills } from "./components/index"


function App() {

  return (
    <>
    <Header/>
      <main>
          <Home/>
          <About/>
          <Skills/>
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
