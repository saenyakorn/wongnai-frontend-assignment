import React, { lazy } from "react"
import { Switch, Route } from "react-router-dom"

// Import All Pages
import NotFoundPage from "../pages/notFound"
const MainPage = lazy(() => import("../pages/main"))

const RouteModule = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/trips" component={MainPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default RouteModule
