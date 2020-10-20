import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react"
import AppModule from "../../modules/app.module"
import userEvent from "@testing-library/user-event"
import { listOfTags, renderWithRoute } from "../../utls/testing"
import { act } from "react-dom/test-utils"

test("Empty value search bar when first visit", async () => {
  let screen = render(<AppModule />)
  let searchField: any = screen.getAllByTestId("search")[0]
  expect(searchField.value).not.toBeTruthy()
})

test("Searcing a nonexistent tag", async () => {
  let screen = render(<AppModule />)
  let searchField: any = screen.getAllByTestId("search")[0]
  userEvent.type(searchField, "something-does-not-exist")
  fireEvent.submit(searchField)
  waitFor(() => expect(screen.getByText(/หารายการไม่พบ/i)).toBeInTheDocument())
})

test.each(listOfTags)("Default value of search bar must match the pathname", (input, output) => {
  act(() => {
    let screen = renderWithRoute(<AppModule />, { route: `/tag/${input}` })
    let searchField: any = screen.getAllByTestId("search")[0]
    expect(searchField.value).toBe(output)
  })
})

test.each(listOfTags)("Submiting the search bar", (input, output) => {
  let screen = render(<AppModule />)
  let searchField: any = screen.getAllByTestId("search")[0]
  userEvent.type(searchField, input)
  fireEvent.submit(searchField)
  expect(window.location.pathname).toBe(`/tag/${encodeURIComponent(output)}`)
})
