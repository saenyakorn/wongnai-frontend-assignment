import React, { createContext, useCallback, useContext, useState } from "react"
import { useSnackBarContext } from "./snackbar.controller"
import { getAllTrips, getTripsByKeyword } from "../services/trip.service"
import Trip from "../models/trip.model"
import { useHistory } from "react-router-dom"

export interface TripConstruct {
  trips: Trip[] | undefined
  setTrips: React.Dispatch<React.SetStateAction<Trip[] | undefined>>
  setupTrips: (keyword: string | undefined) => Promise<void>
  initKeywordValue: string | undefined
  setInitKeywordValue: React.Dispatch<React.SetStateAction<string | undefined>>
  searchTrip: (keyword: string | undefined) => void
}

export const TripContext = createContext({} as TripConstruct)

export const useTripContext = () => useContext(TripContext)

const TripProvider: React.FC = ({ children, ...other }) => {
  const history = useHistory()
  const [initKeywordValue, setInitKeywordValue] = useState<string | undefined>("")
  const [trips, setTrips] = useState<Trip[] | undefined>(undefined)
  const { activeSnackbar } = useSnackBarContext()

  const fetchingTrips = useCallback(
    async (tripFetcher: () => Promise<Trip[]>): Promise<Trip[] | undefined> => {
      let result
      try {
        // fetching trips data
        result = await tripFetcher()
      } catch (error) {
        // show up the snackbar if it has some error
        console.error(error.response)
        activeSnackbar({
          message: "ไม่สามารถดึงข้อมูลได้",
          type: "error"
        })
      }
      return result
    },
    [activeSnackbar]
  )

  const setupTrips = useCallback(
    async (keyword: string | undefined) => {
      let data
      setTrips(undefined)
      if (!keyword) {
        // if there is no `keyword` params, then searching trip without keyword
        data = await fetchingTrips(async () => await getAllTrips())
      } else {
        // if there is `keyword` params, then searching trip by keyword
        data = await fetchingTrips(async () => await getTripsByKeyword(keyword))
      }
      setInitKeywordValue(keyword)
      setTrips(data)
    },
    [fetchingTrips]
  )

  const searchTrip = useCallback(
    (keyword: string | undefined) => {
      // after user submit the form, redirect to the page with `keyword` params
      history.push(keyword ? `/keyword/${keyword}` : "/")
    },
    [history]
  )

  const value = { trips, setTrips, setupTrips, initKeywordValue, setInitKeywordValue, searchTrip }

  return (
    <TripContext.Provider value={value} {...other}>
      {children}
    </TripContext.Provider>
  )
}

export default TripProvider
