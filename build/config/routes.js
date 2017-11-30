const router = require('express').Router()

const personController = require('./../controler/person.controller.js')

router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`)
  next()
})

router.get('/', (req, res) => {
  res.send('Mongo Test RestFull API')
})

const main = router

module.exports = app => {
  app.use('/api/people', personController)
  app.use('*', router)
}
