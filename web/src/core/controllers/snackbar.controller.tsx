import React, { createContext, useCallback, useContext, useState } from "react"
import { ActiveSnackBarProps } from "../components/snackbar.component"
import SnackbarComponent from "../components/snackbar.component"

let currentSnackbarId = 0

export interface SnackbarConstruct {
  activeSnackbar: (props: ActiveSnackBarProps) => void
}

export const SnackbarContext = createContext({} as SnackbarConstruct)

export const useSnackBarContext = () => useContext(SnackbarContext)

const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbars, setSnackbars] = useState<Record<string, ActiveSnackBarProps>>({})

  const activeSnackbar = useCallback((props: ActiveSnackBarProps) => {
    setSnackbars(snackbars => ({ ...snackbars, [`${++currentSnackbarId}`]: props }))
  }, [])

  const removeSnackbar = useCallback((snackbarId: string) => {
    setSnackbars(snackbars => {
      const newSnackbars: Record<string, ActiveSnackBarProps> = {}
      Object.keys(snackbars).forEach(id => {
        if (id !== snackbarId) {
          newSnackbars[id] = snackbars[id]
        }
      })
      return newSnackbars
    })
  }, [])

  const value = { activeSnackbar }
  return (
    <SnackbarContext.Provider value={value}>
      {Object.keys(snackbars).map(id => {
        const snackbar = snackbars[id]
        return <SnackbarComponent key={id} id={id} {...snackbar} removeSnackbar={removeSnackbar} />
      })}
      {children}
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider
