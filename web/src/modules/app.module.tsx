import { ThemeProvider } from "@material-ui/core"
import React, { Suspense } from "react"

// Route and Other App Controller
import RouteModule from "./route.module"
import LoadingProvider from "../core/controllers/loading.controller"
import LoadingComponent from "../core/components/loading.component"
import SnackbarProvider from "../core/controllers/snackbar.controller"
import ErrorBoundary from "../core/controllers/errorBoundary"
import { BrowserRouter } from "react-router-dom"

// Custom Theme
import theme from "../theme/theme"
import TripProvider from "../core/controllers/trip.controller"

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
