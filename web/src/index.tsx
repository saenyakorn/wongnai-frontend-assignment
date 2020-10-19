import React from "react"
import ReactDOM from "react-dom"

import "./theme/index.css"
import AppModule from "./modules/app"
import { register } from "./serviceWorker"

ReactDOM.render(<AppModule />, document.getElementById("root"))

register()
