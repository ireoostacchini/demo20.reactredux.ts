import countries, { fetchCountries, addCountry } from "./CountriesSlice"

let initialState

beforeEach(() => {
  initialState = {
    list: [
      {
        "id": 1,
        "name": "Italy",
        "code": "ITA"
      },
      {
        "id": 2,
        "name": "France",
        "code": "FRA"
      },
      {
        "id": 3,
        "name": "United Kingdom",
        "code": "GBR"
      }
    ],
    addCountryStatus: "idle",
    fetchCountriesStatus: "idle",
  };
});

describe('fetchCountries', () => {

  it('pending action sets the status to pending', () => {

    const result = countries(initialState, {
      type: fetchCountries.pending,
      payload: {}
    })
    expect(result.fetchCountriesStatus).toEqual("pending")
  })
})

describe('addCountry', () => {

  it('fulfilled action inserts the country in the (sorted by name) list', () => {

    const newCountry = {
      "id": "4",
      "name": 'Germany',
      "code": "DEU"
    }

    const result = countries(initialState, {
      type: addCountry.fulfilled,
      payload: newCountry
    })


    expect(result.list.length).toEqual(4)
    //the added country should be in second position inthe sorted list
    expect(result.list[1].code).toEqual("DEU")
  })
})
