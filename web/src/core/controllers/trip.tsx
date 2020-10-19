import React, { createContext, useCallback, useContext, useMemo, useState } from "react"
import { useLoadingContext } from "./loading"
import { useSnackBarContext } from "./snackbar"
import { getAllTrips, getTripsByTag } from "../../core/services/trip"
import Trip from "../models/trip"
import { useHistory } from "react-router-dom"
import { useQuery } from "../../utls/hook"

export interface TripConstruct {
  trips: Trip[] | undefined
  setTrips: React.Dispatch<React.SetStateAction<Trip[] | undefined>>
  setupTrips: () => Promise<void>
  initTagValue: string | null
  searchTrip: (event: any) => Promise<void>
}

export const TripContext = createContext({} as TripConstruct)

export const useTripContext = () => useContext(TripContext)

const TripProvider: React.FC = ({ children, ...other }) => {
  const query = useQuery()
  const history = useHistory()
  const [trips, setTrips] = useState<Trip[] | undefined>(undefined)
  const { setLoading } = useLoadingContext()
  const { activeSnackbar } = useSnackBarContext()

  const initTagValue = useMemo(() => (query.has("tag") ? query.get("tag") : ""), [query])

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

  const setupTrips = useCallback(async () => {
    let data
    if (!initTagValue) {
      // if there is no `tag` params, then searching trip without tag
      data = await fetchingTrips(async () => await getAllTrips())
    } else {
      // if there is `tag` params, then searching trip by tag
      data = await fetchingTrips(async () => await getTripsByTag(initTagValue))
    }
    setTrips(data)
  }, [fetchingTrips, initTagValue])

  const searchTrip = useCallback(
    async (tag: string | null) => {
      // after user submit the form, redirect to the page with `tag` params
      history.push(!tag ? `/trips` : `/trips?tag=${tag}`)
      window.location.reload()
      await setupTrips()
    },
    [history, setupTrips]
  )

  const value = { trips, setTrips, setupTrips, initTagValue, searchTrip }
  return (
    <TripContext.Provider value={value} {...other}>
      {children}
    </TripContext.Provider>
  )
}

export default TripProvider
