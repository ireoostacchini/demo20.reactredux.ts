import React, { useReducer } from 'react'

//couldn't get this to work as a .ts file

//https://kentcdodds.com/blog/how-to-use-react-context-effectively

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
      return { ...state, isAuthenticated: action.payload.isAuthenticated, user: action.payload.user };
    case "CLEAR":
      localStorage.removeItem('currentUser');
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
};



function setInitialState() {
  const initialState = {
    isAuthenticated: false,
    user: undefined
  };

  const currentUserData = localStorage.getItem("currentUser");

  if (!!currentUserData) {
    initialState.isAuthenticated = true;
    initialState.user = JSON.parse(currentUserData);
  }
  return initialState;
}


const initialState = setInitialState();

const CurrentUserStateContext = React.createContext(initialState);
const CurrentUserDispatchContext = React.createContext();



const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CurrentUserStateContext.Provider value={state}>
      <CurrentUserDispatchContext.Provider value={dispatch}>
        {children}
      </CurrentUserDispatchContext.Provider>
    </CurrentUserStateContext.Provider>
  )
}

const useCurrentUserState = () => {
  const context = React.useContext(CurrentUserStateContext)
  if (context === undefined) {
    throw new Error('useCurrentUserState must be used within a CurrentUserProvider')
  }
  return context
}

const useCurrentUserDispatch = () => {
  const context = React.useContext(CurrentUserDispatchContext)
  if (context === undefined) {
    throw new Error('useCurrentUserDispatch must be used within a CurrentUserProvider')
  }
  return context
}

export { CurrentUserProvider, useCurrentUserState, useCurrentUserDispatch }



