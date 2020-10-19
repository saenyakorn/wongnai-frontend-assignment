const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()
const dotenv = require("dotenv")

dotenv.config()

//set up middlewares
server.use(middlewares)

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

//rewriter router
server.use(
  jsonServer.rewriter({
    "/api/trips?tag=:tag": "/trips?tags_like=:tag",
    "/api/trips?from=:from&to=:to": "/trips?_start=:from&_end=:to",
    "/api/*": "/$1"
  })
)

//set up database
server.use(router)

server.listen(process.env.PORT, () => console.log(`json server is running at localhost:${process.env.PORT}`))
