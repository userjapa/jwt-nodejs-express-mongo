const router = require('express').Router()

const personService = require('./../service/person.service.js')

router.get('/', async (req, res) => {
  let filter = {}

  if (req.query.name) filter.name = req.query.name
  if (req.query.email) filter.email = req.query.email

  try {
    const result = await personService.find(filter)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const result = await personService.findById(_id)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  const newPerson = {
    name: req.body.name,
    email: req.body.email,
    passwd: req.body.passwd
  }

  if (!newPerson.name)  { res.status(400).json({ message: 'Name is required' }) }
  else if (!newPerson.email) { res.status(400).json({ message: 'Email is required' }) }
  else if (!newPerson.passwd) { res.status(400).json({ message: 'Password is required' }) }
  else {

    try {
      const result = await personService.create(newPerson)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }
})

router.put('/:id', async (req, res) => {
  const modify = {
    _id: req.params.id,
    name: req.body.name,
    email: req.body.email
  }

  if (!modify.name) { res.status(400).json({ message: 'Name is required' }) }
  else if (!modify.email) { res.status(400).json({ message: 'Email is required' }) }
  else {
    try {
      const result = await personService.update(modify)
      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
})

router.delete('/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const result = await personService.remove({_id: _id})
    res.status(200).json(result)
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  const login = {
    email: req.body.email,
    passwd: req.body.passwd
  }

  if (!login.email) { res.status(400).json({ message: 'Email is required' }) }
  else if (!login.passwd) { res.status(400).json({ message: 'Password is missing' }) }
  else {
    try {
      const result = await personService.login(login)
      res.set('x-access-token', result)
      res.status(200).json({ message: 'Login success' })
    } catch (err) {
      res.status(500).json(err)
    }
  }
})

router.get('/login/verify', async (req, res) => {
  const token = req.headers['x-access-token']
  if (!token) { res.status(400).json({ message: 'Token is missing' }) }
  else {
    try {
      const result = await personService.check(token)
      res.status(200).json({ message: 'Funfo!' })
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
})

module.exports = router
