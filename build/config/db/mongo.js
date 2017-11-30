const mongoose = require('mongoose')

const config = require('./../config.js')

mongoose.connect(config.database.url, config.database.options)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Failed to Connect'))
db.once('open', () => {
  console.log('Connected!')
})

module.exports = mongoose
