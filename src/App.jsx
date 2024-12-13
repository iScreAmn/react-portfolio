import { Header, Footer, Home, About, Clients, Contacts, Features, Portfolio, Services, Skills } from "./components/index"


function App() {

  return (
    <>
    <Header/>
      <main>
          <Home/>
          <About/>
          <Clients/>
          <Contacts/>
          <Features/>
          <Portfolio/>
          <Services/>
          <Skills/>
          <div className="container">
            <h1>React Portfolio</h1>
          </div>
      </main>
      <Footer/>
    </>
  )
}

export default App
