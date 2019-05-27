import express from 'express'
import jwt from 'jsonwebtoken'
const { check, validationResult } = require('express-validator/check')

import config from '../../config'

const router = express.Router()

router.post(
  '/login',
  [
    check('username', 'Name is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { username, password } = req.body

    // todo
    if (username === 'admin' && password === 'password') {
      const token = jwt.sign({ username: username }, config.secret, {
        expiresIn: '24h'
      })
      res.status(200).send({ token: token })
    } else {
      res.status(401).send({ error: [{ msg: 'Invalid credentials' }] })
    }
  }
)

router.post('/register', (req, res) => {})

router.get('/whoami', (req, res) => {})

module.exports = router
