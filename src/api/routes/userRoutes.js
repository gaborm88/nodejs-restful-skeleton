import express from 'express'

import UserSchema from './../../model/UserSchema'
import { verifyToken } from './../middleware/authMiddleware'

const router = express.Router()

router.get('/', verifyToken, (req, res) => {
  UserSchema.find({})
    .then(item => res.status(200).send(item))
    .catch(err => {
      console.log(err.message)
      res.status(500).send('Error get all')
    })
})

router.post('/', verifyToken, (req, res) => {
  const { firstName, lastName, login, addresses } = req.body
  UserSchema.create({
    firstName,
    lastName,
    login,
    addresses
  })
    .then(item => res.status(200).send(item))
    .catch(err => {
      console.log(err.message)
      res.status(500).send('Creation error')
    })
})

router.get('/:id', verifyToken, async (req, res) => {
  UserSchema.findById(req.params.id)
    .then(item => res.status(200).send(item))
    .catch(err => {
      console.log(err.message)
      res.status(500).send('Error get by id')
    })
})

router.delete('/:id', verifyToken, (req, res) => {
  UserSchema.findByIdAndRemove(req.params.id)
    .then(item => res.status(200).send(item))
    .catch(err => {
      console.log(err.message)
      res.status(500).send('Delete error')
    })
})

router.put('/:id', verifyToken, (req, res) => {
  UserSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    .then(item => res.status(200).send(item))
    .catch(err => {
      console.log(err.message)
      res.status(500).send('Update error')
    })
})

module.exports = router
