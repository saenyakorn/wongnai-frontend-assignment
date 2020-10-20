import React, { createContext, useCallback, useContext, useState } from "react"
import { useSnackBarContext } from "./snackbar.controller"
import { getAllTrips, getTripsByTag } from "../services/trip.service"
import Trip from "../models/trip.model"
import { useHistory } from "react-router-dom"

export interface TripConstruct {
  trips: Trip[] | undefined
  setTrips: React.Dispatch<React.SetStateAction<Trip[] | undefined>>
  setupTrips: (tag: string | undefined) => Promise<void>
  initTagValue: string | undefined
  setInitTagValue: React.Dispatch<React.SetStateAction<string | undefined>>
  searchTrip: (tag: string | undefined) => void
}

export const TripContext = createContext({} as TripConstruct)

export const useTripContext = () => useContext(TripContext)

const TripProvider: React.FC = ({ children, ...other }) => {
  const history = useHistory()
  const [initTagValue, setInitTagValue] = useState<string | undefined>("")
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
    async (tag: string | undefined) => {
      let data
      setTrips(undefined)
      if (!tag) {
        // if there is no `tag` params, then searching trip without tag
        data = await fetchingTrips(async () => await getAllTrips())
      } else {
        // if there is `tag` params, then searching trip by tag
        data = await fetchingTrips(async () => await getTripsByTag(tag))
      }
      setInitTagValue(tag)
      setTrips(data)
    },
    [fetchingTrips]
  )

  const searchTrip = useCallback(
    (tag: string | undefined) => {
      // after user submit the form, redirect to the page with `tag` params
      history.push(tag ? `/tag/${tag}` : "/")
    },
    [history]
  )

  const value = { trips, setTrips, setupTrips, initTagValue, setInitTagValue, searchTrip }

  return (
    <TripContext.Provider value={value} {...other}>
      {children}
    </TripContext.Provider>
  )
}

export default TripProvider
