const mongo = require('./../config/db/mongo.js')

const personSchema = new mongo.Schema({
  name: String,
  email: String,
  passwd: String,
  register: {
    type: Date,
    default: Date.now
  }
})

const person = mongo.model('Person', personSchema)

module.exports = person
