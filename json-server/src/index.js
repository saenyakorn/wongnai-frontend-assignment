const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("../db.json")
const middlewares = jsonServer.defaults()
const dotenv = require("dotenv")

dotenv.config()

//set up middlewares
server.use(middlewares)
server.use(jsonServer.bodyParser)

//rewriter router
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/api/trips?tag=:tag": "/trips?tags_like=:tag",
    "/api/trips?from=:from&to=:to": "/trips?_start=:from&_end=:to"
  })
)

//set up database
server.use(router)

server.listen(process.env.PORT, () => console.log(`json server is running at localhost:${process.env.PORT}`))
