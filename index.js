const express = require('express')

const middlewares = require('./build/config/middleware.js')
const routes = require('./build/config/routes.js')

const port = process.env.PORT || 8080

const app = express()

middlewares(app)
routes(app)

app.listen(port, () => {
  console.log('Listening at port 8080')
})
