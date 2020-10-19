import React from "react"
import { Switch, Route } from "react-router-dom"

// Import All Pages
import NotFoundPage from "../pages/notFound"
import MainPage from "../pages/main"

const RouteModule = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/tag/:tag" component={MainPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default RouteModule
