import React from "react"
import AddCountryForm from "./AddCountryForm"
import { useSelector, useDispatch } from "react-redux"
import { useCurrentUserState } from "../CurrentUser/CurrentUserContext"
import { addCountry } from "../Countries/CountriesSlice"
import { RootState } from "../store"
import CountryModel from "../Countries/CountryModel"
import CurrentUserState from "../CurrentUser/CurrentUserState"
import AddCountryDto from "../Countries/AddCountryFormModel"


type AddCountryFormContainerProps = {
  countries: CountryModel[]
}

const AddCountryFormContainer = (props: AddCountryFormContainerProps) => {

  const dispatch = useDispatch()

  const { addCountryStatus, addCountryError } = useSelector((state: RootState) => state.countries)

  const currentUserState: CurrentUserState = useCurrentUserState()

  const token = currentUserState.user?.token || ""


  const addCountryWrapper = async (country: AddCountryDto) => {
    dispatch(addCountry({ country, token }))
  }


  return (
    <AddCountryForm
      addCountryWrapper={addCountryWrapper}
      status={addCountryStatus}
      error={addCountryError}
    />
  )
}

export default AddCountryFormContainer
