import React, { createContext, useCallback, useContext, useState } from "react"
import { useLoadingContext } from "./loading"
import { useSnackBarContext } from "./snackbar"
import { getAllTrips, getTripsByTag } from "../../core/services/trip"
import Trip from "../models/trip"
import { useHistory } from "react-router-dom"

export interface TripConstruct {
  trips: Trip[] | undefined
  setTrips: React.Dispatch<React.SetStateAction<Trip[] | undefined>>
  setupTrips: (tag: string | undefined) => Promise<void>
  initTagValue: string | undefined
  setInitTagValue: React.Dispatch<React.SetStateAction<string | undefined>>
  searchTrip: (tag: string | undefined) => Promise<void>
}

export const TripContext = createContext({} as TripConstruct)

export const useTripContext = () => useContext(TripContext)

const TripProvider: React.FC = ({ children, ...other }) => {
  const history = useHistory()
  const [initTagValue, setInitTagValue] = useState<string | undefined>("")
  const [trips, setTrips] = useState<Trip[] | undefined>(undefined)
  const { setLoading } = useLoadingContext()
  const { activeSnackbar } = useSnackBarContext()

  const fetchingTrips = useCallback(
    async (tripFetcher: () => Promise<Trip[]>): Promise<Trip[] | undefined> => {
      let result
      setLoading(true)
      try {
        result = await tripFetcher()
      } catch (error) {
        console.error(error.response)
        activeSnackbar({
          message: "ไม่สามารถดึงข้อมูลได้",
          type: "error"
        })
      }
      setLoading(false)
      return result
    },
    [setLoading, activeSnackbar]
  )

  const setupTrips = useCallback(
    async (tag: string | undefined) => {
      let data
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
    async (tag: string | undefined) => {
      // after user submit the form, redirect to the page with `tag` params
      history.push(tag ? `/tag/${tag}` : "/")
      window.location.reload()
      await setupTrips(tag)
    },
    [history, setupTrips]
  )

  const value = { trips, setTrips, setupTrips, initTagValue, setInitTagValue, searchTrip }

  return (
    <TripContext.Provider value={value} {...other}>
      {children}
    </TripContext.Provider>
  )
}

export default TripProvider
