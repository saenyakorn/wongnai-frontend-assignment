import { render } from "@testing-library/react"
import { act } from "react-dom/test-utils"

export const listOfKeywords = [
  ["เกาะ", "เกาะ"],
  ["ทะเล", "ทะเล"],
  ["ถ่ายรูปสวย", "ถ่ายรูปสวย"],
  ["คาเฟ่", "คาเฟ่"]
]

export const renderWithRoute = (ui: JSX.Element, { route = "/" } = {}) => {
  act(() => {
    window.history.pushState({}, "Test page", route)
  })
  return render(ui)
}
