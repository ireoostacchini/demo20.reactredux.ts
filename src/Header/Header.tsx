import React from "react";
import Menu from "../Menu";
import { useHistory, useLocation } from "react-router-dom";
import CurrentUserState from "../CurrentUser/CurrentUserState";
import "../style.css"



type HeaderProps = {
  clearCurrentUser: Function
  currentUserState: CurrentUserState
}

const Header = (props: HeaderProps) => {

  const history = useHistory();
  const location = useLocation();

  const logOut = () => {

    props.clearCurrentUser();

    history.push("/");

  }

  const logIn = () => {

    //when we click on /login from an unprotected page, we redirect to it once logged in
    history.push("/login", location.pathname);
  }

  return (<header className="App-header">
    <p>Demo20 - React / Redux / Typescript</p>

    {props.currentUserState.isAuthenticated
      ? <div>
        <p>{props.currentUserState.user?.firstName} {props.currentUserState.user?.surname} is logged in</p>
        <button type="button" className="link-button" onClick={logOut}>Log out</button>
      </div>
      : <button type="button" className="link-button" onClick={logIn}>Log in</button>

    }

    <Menu />
  </header>
  )
}

export default Header;
