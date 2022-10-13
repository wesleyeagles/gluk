import { BrowserRouter } from "react-router-dom"
import { Router } from "./components/Router/Router"

export const App = () => {
   return (
      <BrowserRouter>
      <Router />
      </BrowserRouter>
   )
}