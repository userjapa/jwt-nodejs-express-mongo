const jwt = require('jsonwebtoken')

const Person = require('./../model/person.model.js')
const config = require('./../config/config.js')

const find = filter => {
  return new Promise((resolve, reject) => {
    Person.find(filter, (err, people) => {
      if (err) reject({ message: 'Failed to get people', error: err })
      else resolve({ message: 'Got people successfully', data: people })
    })
  })
}

const findById = id => {
  return new Promise((resolve, reject) => {
    Person.findById(id, (err, person) => {
      if (err) reject({ message: 'Failed to get person', error: err })
      else resolve({ message: 'Got person successfully', data: person })
    })
  })
}

const create = person => {
  return new Promise((resolve, reject) => {
    Person.create(person, (err, newPerson) => {
      if (err) reject({ message: 'Failed to create new person', error: err })
      else resolve({ message: `${newPerson.name} created successfully!`, data: newPerson })
    })
  })
}

const update = modify => {
  return new Promise((resolve, reject) => {
    Person.findById(modify._id, (err, person) => {
      if (err) reject({ message: 'Failed to update person', error: err })
      person.name = modify.name
      person.email = modify.email
      person.save((err, response) => {
        if (err) reject({ message: 'Failed to update person', error: err })
        else resolve({ message: 'Person updated successfully', data: response })
      })
    })
  })
}

const remove = condition => {
  return new Promise((resolve, reject) => {
    Person.remove(condition, (err) => {
      if (err) reject({ message: 'Failed to remove person', error: err })
      else resolve({ message: 'Removed person successfully' })
    })
  })
}

const login = login => {
  return new Promise((resolve, reject) => {
    Person.findOne({ email: login.email }, (err, person) => {
      if (err) { reject({ message: 'Failed to Login' }) }
      else {
        if (!person) { reject({ message: 'User not found' }) }
        else {
          if (person.passwd !== login.passwd ) { reject({ message: 'Incorrect Password' }) }
          else {
            payload = {
              _id: person._id
            }

            const token = jwt.sign(payload, config.secret)

            resolve(token)
          }
        }
      }
    })
  })
}

const check = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) { reject({ message: 'Failed do decode token', error: err }) }
      else {
        console.log(jwt.decode(token, {complete: true}))
        resolve({ message: 'Decoded token successfully', data: token })
      }
    })
  })
}

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  remove: remove,
  login: login,
  check: check
}
