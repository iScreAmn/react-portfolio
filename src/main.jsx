import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { LocaleProvider } from "./context/LocaleContext.jsx";

createRoot(document.getElementById('root')).render(
  <LocaleProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LocaleProvider>
)
