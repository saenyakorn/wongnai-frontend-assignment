import React from "react"
import { render, fireEvent } from "@testing-library/react"
import AppModule from "../app.module"
import { renderWithRoute, listOfTags } from "../../utls/testing"

test("full app rendering/navigating", async () => {
  let screen = render(<AppModule />)
  expect(screen.getByText(/เที่ยวไหนดี/i)).toBeInTheDocument()

  let tag = "เกาะ"
  // finding element with text `tag`
  let someLinkElements = await screen.findAllByText(tag)
  // click on the tag
  fireEvent.click(someLinkElements[0])
  // route to the new page
  expect(screen.getByText(/เที่ยวไหนดี/i)).toBeInTheDocument()
  expect(window.location.pathname).toBe(`/tag/${encodeURIComponent(tag)}`)
})

test("landing on bad page", async () => {
  let screen = renderWithRoute(<AppModule />, { route: "/something-that-does-not-match" })
  expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument()
})
