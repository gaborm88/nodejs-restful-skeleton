import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config';

const { check, validationResult } = require('express-validator/check');

const router = express.Router();

router.post(
  '/login',
  [
    check('username', 'Name is required')
      .not()
      .isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
      const token = jwt.sign({ username }, config.secret, {
        expiresIn: '24h',
      });
      res.status(200).send({ token });
    } else {
      res.status(401).send({ error: [{ msg: 'Invalid credentials' }] });
    }
  },
);

router.post('/register', (req, res) => {});

router.get('/whoami', (req, res) => {});

module.exports = router;
