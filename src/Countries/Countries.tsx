import React from "react"
import Country from "./Country"
import AddCountryFormContainer from "./../AddCountryForm/AddCountryFormContainer"
// eslint-disable-next-line no-unused-vars
import CountryModel from "./CountryModel"

type CountriesProps = {
  countries: CountryModel[]
}

const renderCountries = (countries: CountryModel[]) => {
  if (countries.length === 0) {
    return "Loading..."
  }

  const result = countries.map((country: CountryModel) => (
    <Country key={country.id} country={country} />
  ))

  return result
}

const Countries = (props: CountriesProps) => {
  return (
    <div>
      <div>There are {props.countries.length} countries</div>

      <ul className="countries-list">{renderCountries(props.countries)}</ul>

      <p>Add country</p>
      {
        <AddCountryFormContainer countries={props.countries} />
      }
    </div>
  )
}
export default Countries
