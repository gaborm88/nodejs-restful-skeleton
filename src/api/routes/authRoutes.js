import express from 'express'
import jwt from 'jsonwebtoken'

import config from '../../config'

const router = express.Router()

router.post('/login', (req, res) => {
  const mockedUsername = 'admin'
  const mockedPassword = 'password'
  // todo validator
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    res.status(400).send({ success: false })
    return
  }
  // todo
  if (username === mockedUsername && password === mockedPassword) {
    const token = jwt.sign({ username: username }, config.secret, {
      expiresIn: '24h'
    })
    //res.json({ success: true, token: token });
    res.status(200).send({ success: true, token: token })
  } else {
    res.status(403).send({ success: false })
  }
})

router.post('/register', (req, res) => {})

router.get('/whoami', (req, res) => {})

module.exports = router
