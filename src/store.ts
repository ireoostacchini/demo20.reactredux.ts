import { configureStore, combineReducers } from '@reduxjs/toolkit'
import countriesReducer from './Countries/CountriesSlice'
import logger from 'redux-logger'


// https://redux.js.org/tutorials/essentials/part-2-app-structure

// https://redux-toolkit.js.org/api/getDefaultMiddleware

// https://github.com/LogRocket/redux-logger

const rootReducer = combineReducers({
  countries: countriesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: rootReducer,
  //thunk is part of the default middleware. logger must be last
  //https://redux-toolkit.js.org/api/getDefaultMiddleware#middleware-callback-notation-for-configurestore
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

// TODO: devtools
// https://github.com/reduxjs/redux-devtools/blob/master/docs/Walkthrough.md#manual-integration

export default store
