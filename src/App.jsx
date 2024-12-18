import { Header, Footer, Home, About, Services, Clients, Contacts, Features, Portfolio } from "./components/index"


function App() {

  return (
    <>
    <Header/>
      <main>
          <Home/>
          <About/>
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
