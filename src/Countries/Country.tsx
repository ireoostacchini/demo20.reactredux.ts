import React from "react"
//https://github.com/eslint/typescript-eslint-parser/issues/457
// eslint-disable-next-line no-unused-vars
import CountryModel from "./CountryModel"

type CountryProps = {
  country: CountryModel
}

const Country = (props: CountryProps) => {
  return <li className="countries-item">{props.country.name} {props.country.code}</li>
}

export default Country
