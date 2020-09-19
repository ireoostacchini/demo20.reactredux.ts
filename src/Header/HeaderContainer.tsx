import Header from "./Header"
import React from "react"
import { useCurrentUserState, useCurrentUserDispatch } from "../CurrentUser/CurrentUserContext"
import CurrentUserState from "../CurrentUser/CurrentUserState"


const HeaderContainer = () => {

  const dispatch = useCurrentUserDispatch()
  const currentUserState: CurrentUserState = useCurrentUserState()

  const clearCurrentUser = () => {
    dispatch({ type: "CLEAR" })
  }

  return (<Header
    clearCurrentUser={clearCurrentUser}
    currentUserState={currentUserState}
  ></Header>)
}

export default HeaderContainer


