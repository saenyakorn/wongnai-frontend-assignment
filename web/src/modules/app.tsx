import { ThemeProvider } from "@material-ui/core"
import React, { Suspense } from "react"

// Route and Other App Controller
import RouteModule from "./route"
import LoadingProvider from "../core/controllers/loading"
import LoadingComponent from "../core/components/loading"
import SnackbarProvider from "../core/controllers/snackbar"
import ErrorBoundary from "../core/controllers/errorBoundary"
import { BrowserRouter } from "react-router-dom"

// Custom Theme
import theme from "../theme/theme"
import TripProvider from "../core/controllers/trip"

const AppModule = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingComponent open={true} />}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <LoadingProvider>
              <SnackbarProvider>
                <TripProvider>
                  <RouteModule />
                </TripProvider>
              </SnackbarProvider>
            </LoadingProvider>
          </BrowserRouter>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

export default AppModule
