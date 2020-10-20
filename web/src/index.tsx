import React from "react"
import ReactDOM from "react-dom"

import "./theme/index.css"
import AppModule from "./modules/app.module"
import { register } from "./serviceWorker"

ReactDOM.render(<AppModule />, document.getElementById("root"))

register()
