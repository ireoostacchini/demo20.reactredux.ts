import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
import AxiosConfig from "../Utils/AxiosConfig"
import Config from "../Config"
import CountryModel from "./CountryModel"
import { useSelector, TypedUseSelectorHook } from 'react-redux'

const url = Config.settings.apiBaseUrl + "/countries"

//https://redux-toolkit.js.org/api/createAsyncThunk
//https://redux-toolkit.js.org/usage/usage-guide#asynchronous-logic-and-data-fetching

// The function below is called a thunk and allows us to perform async logic.
// It can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
// This will call the thunk with the `dispatch` function as the first argument.
// Async code can then be executed and other actions can be dispatched

//https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
export const fetchCountries = createAsyncThunk('countries/fetch', async (token: string, { rejectWithValue }) => {

  const config = new AxiosConfig().addAuthorizationHeader(token)

  try {
    const response = await axios(url, config)
    return response.data
  }
  catch (err) {
    console.log(err.response.data)
    return rejectWithValue(err.response.data)
  }


})

interface AddCountryCreateAsyncThunkProperties {
  country: any
  token: string
}


//we wrap country, token in an object - it seems we're allowed one paramter
//(any second param would seem to be the store itself)
export const addCountry = createAsyncThunk('countries/add', async (props: AddCountryCreateAsyncThunkProperties, { rejectWithValue }) => {

  const data = { name: props.country.countryName, code: props.country.countryCode }

  const config = new AxiosConfig().addAuthorizationHeader(props.token)

  try {
    const response = await axios.post(url, data, config)
    return response.data

  }
  catch (err) {
    console.log(err.response.data)
    return rejectWithValue(err.response.data)
  }
})


//https://redux.js.org/tutorials/essentials/part-5-async-logic

interface CountriesState {
  list: CountryModel[]
  addCountryStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
  fetchCountriesStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
  addCountryError?: string | undefined
  fetchCountriesError?: string | undefined
}

const initialState: CountriesState = {
  list: [],
  addCountryStatus: "idle",
  fetchCountriesStatus: "idle",
};

type ErrorContent = {
  Code: string
  Messages: string[]
}

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

//https://redux-toolkit.js.org/usage/usage-with-typescript#defining-the-initial-state-type
export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
  },
  //https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk
  //https://redux-toolkit.js.org/api/createAsyncThunk#createasyncthunk
  //createAsyncThunk creates these three action types (pending, fulfilled, rejected) for us

  //https://redux-toolkit.js.org/usage/usage-with-typescript#type-safety-with-extrareducers
  extraReducers: builder => {

    builder.addCase(fetchCountries.pending, (state, action) => {
      state.fetchCountriesStatus = "pending";
    })
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.fetchCountriesStatus = "succeeded";
      state.list = action.payload.countries
    })
    builder.addCase(fetchCountries.rejected, (state, action) => {

      state.list = [];
      state.fetchCountriesStatus = "failed";
      state.fetchCountriesError = "Fetch countries failed";
    })

    builder.addCase(addCountry.pending, (state, action) => {
      state.addCountryStatus = "pending";
      state.addCountryError = undefined;
    })
    builder.addCase(addCountry.fulfilled, (state, action) => {
      state.list = state.list.concat(action.payload);

      state.list = state.list.sort((a, b) => a.name.localeCompare(b.name));

      state.addCountryStatus = "succeeded";
      state.addCountryError = undefined;
    })
    builder.addCase(addCountry.rejected, (state, action) => {
      state.addCountryStatus = "failed";
      state.addCountryError = "Add country failed";
    })
  }
})

export default countriesSlice.reducer

export const useTypedSelector: TypedUseSelectorHook<CountriesState> = useSelector
