import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Country from "./Country"
import '@testing-library/jest-dom/extend-expect'

//https://redux.js.org/recipes/writing-tests

describe('Country', () => {

  it('xx', async () => {

    const country = {
      "id": 1,
      "name": "Italy",
      "code": "ITA"
    }

    //https://testing-library.com/docs/react-testing-library/api
    //https://www.robinwieruch.de/react-testing-library - excellent walk-through

    const { getByText } = render(<Country key={country.id} country={country} />)

    //outputs the whole component's (shallow?) markup
    //screen.debug();

    expect(screen.getByText(/Italy/)).toBeInTheDocument();
  })
})
