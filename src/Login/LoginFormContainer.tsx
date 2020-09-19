import React from "react"
import LoginForm from "./LoginForm"
import Config from "../Config"
import Axios from "axios"
import { useCurrentUserDispatch } from '../CurrentUser/CurrentUserContext'
import CurrentUserState from "../CurrentUser/CurrentUserState"
import LoginModel from "./LoginModel"


const loginHandler = async (login: LoginModel) => {

  const url = Config.settings.apiBaseUrl + "/token"

  const data = { username: login.username, password: login.password }

  const response = await Axios.post(url, data)

  return response.data
}


const LoginFormContainer = () => {

  const dispatch = useCurrentUserDispatch()

  const setCurrentUser = (currentUser: CurrentUserState) => {
    dispatch({ type: "SET", payload: { isAuthenticated: true, user: currentUser } })
  }

  return (
    <LoginForm
      loginHandler={loginHandler}
      setCurrentUser={setCurrentUser}
    />
  )
}

export default LoginFormContainer
