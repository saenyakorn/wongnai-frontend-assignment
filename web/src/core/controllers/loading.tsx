import React, { createContext, useContext, useState } from "react"
import LoadingComponent from "../components/loading"

export interface LoadingConstruct {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = createContext({} as LoadingConstruct)

export const useLoadingContext = () => useContext(LoadingContext)

const LoadingProvider: React.FC = ({ children, ...other }) => {
  const [loading, setLoading] = useState(false)
  const value = { loading, setLoading }

  return (
    <LoadingContext.Provider value={value} {...other}>
      <LoadingComponent open={loading}></LoadingComponent>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
