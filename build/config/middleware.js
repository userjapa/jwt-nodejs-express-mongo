const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const config = require('./config.js')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))

  app.use(morgan('dev'))

}
