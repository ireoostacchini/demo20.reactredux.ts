import React, { useEffect } from "react"
import Countries from "./Countries"
import CurrentUserState from "../CurrentUser/CurrentUserState"
import { useCurrentUserState } from "../CurrentUser/CurrentUserContext"
import { useSelector, useDispatch } from "react-redux"
import { fetchCountries } from "./CountriesSlice"
import { RootState } from "../store"

const CountriesContainer = () => {

  const dispatch = useDispatch()

  const { list, fetchCountriesStatus, fetchCountriesError } = useSelector((state: RootState) => state.countries)

  const currentUserState: CurrentUserState = useCurrentUserState()

  const token = currentUserState.user?.token || ""


  //https://dev.to/trentyang/replace-lifecycle-with-hooks-in-react-3d4n
  //https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
  //https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook

  //useEffect's second param:
  //when it's an empty list, the callback will only be fired once, similar to componentDidMount.
  //when it's absent, the callback will always be fired after every render
  //when the list contains variables, rerender will happen when those variables change

  useEffect(() => {
    const getCountries = async (token: string) => {
      try {

        dispatch(fetchCountries(token))

        console.log("fetched countries")
      } catch (err) {
        console.log("error: " + err.message)
      }
    }

    getCountries(token)
  }, [token, dispatch])

  return (
    <React.Fragment>

      {!!fetchCountriesError && <p className="error">{fetchCountriesError}</p>}

      { <p>Status: {fetchCountriesStatus}</p>}

      <Countries countries={list || []}></Countries>

    </React.Fragment>
  )
}

export default CountriesContainer
