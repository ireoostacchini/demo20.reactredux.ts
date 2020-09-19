import React from "react"
import { Switch, Route, Redirect, useLocation } from "react-router-dom"
import Home from "../Home/Home"
import Page2 from "../Page2/Page2"
import CountriesContainer from "../Countries/CountriesContainer"
import LoginFormContainer from "../Login/LoginFormContainer"
import { useCurrentUserState } from "../CurrentUser/CurrentUserContext"
import CurrentUserState from "../CurrentUser/CurrentUserState"

//https://medium.com/@s4y.solutions/react-route-4-protected-route-even-simpler-9b89dc129cde
const ProtectedRoute
  = ({ isAllowed, pathname, ...props }: any) => {

    //https://stackoverflow.com/questions/52064303/reactjs-pass-props-with-redirect-component
    return (
      isAllowed
        ? <Route {...props} />
        : <Redirect to={{
          pathname: "/login",
          state: pathname || "/"
        }} />)
  }

const Main = () => {

  const currentUserState: CurrentUserState = useCurrentUserState()

  //if we try to hit a protectedt page, we're redirected to /login 
  //- passing the protected page path so we can redirect to it once logged in 
  const location = useLocation();

  return (<Switch>
    <Route path="/login" component={LoginFormContainer}></Route>
    <ProtectedRoute path="/countries" component={CountriesContainer} isAllowed={currentUserState.isAuthenticated} pathname={location.pathname}></ProtectedRoute>
    <Route exact path="/Page2" component={Page2}></Route>
    <Route exact path="/" component={Home}></Route>
  </Switch>
  )
}

export default Main
