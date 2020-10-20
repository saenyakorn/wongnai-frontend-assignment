import React from "react"
import { Switch, Route } from "react-router-dom"

// Import All Pages
import NotFoundPage from "../pages/notFound.page"
import MainPage from "../pages/main.page"

const RouteModule = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/keyword/:keyword" component={MainPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default RouteModule
