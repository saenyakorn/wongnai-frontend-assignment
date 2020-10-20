const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()
const dotenv = require("dotenv")

dotenv.config()

//set up middlewares
server.use(middlewares)

// Allow CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

// Custom Route
server.get("/api/trips", (req, res) => {
  let { keyword } = req.query
  console.log("wwww")
  let db = router.db.get("trips").value()
  if (!!keyword) {
    // has a keyword, then filter trips
    let filteredDB = db.filter(trip => {
      let { title, description, tags } = trip
      return title.includes(keyword) || description.includes(keyword) || tags.join("").includes(keyword)
    })
    res.status(200).send(filteredDB)
  } else {
    // return all trips
    res.status(200).send(db)
  }
})

// set `/api/*` as router
server.use("/api", router)

// Set up database
server.use(router)

server.listen(process.env.PORT, () => console.log(`json server is running at localhost:${process.env.PORT}`))
