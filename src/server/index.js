/* istanbul ignore file */
const express = require('express')
require('express-async-errors')
const errorHandler = require('./middlewares/error-handler')
const rootRouter = require('./routes/root.routes')

const server = express()
const port = 3000

server.use(express.json());
server.use(rootRouter)

server.use(errorHandler)

server.listen(port, () => {
  console.log(`Server listening port ${port}`)
})

