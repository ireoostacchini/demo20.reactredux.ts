import React from "react"
import "./App.css"
import HeaderContainer from "./Header/HeaderContainer"
import Main from "./Main/Main"
import { BrowserRouter as Router } from "react-router-dom"
import { CurrentUserProvider } from './CurrentUser/CurrentUserContext'


const App = () => (

  <CurrentUserProvider>
    <Router>
      <div className="App">
        <HeaderContainer />
        <Main />
      </div>
    </Router>
  </CurrentUserProvider>
)

export default App
