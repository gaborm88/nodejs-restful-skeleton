import jwt from 'jsonwebtoken'
import config from '../../config'

module.exports.verifyToken = (req, res, next) => {
  let token = req.headers['authorization']

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  } else {
    return res.status(401).send({
      message: 'Auth token is not supplied'
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Token is not valid'
      })
    } else {
      // req.decoded = decoded;
      next()
    }
  })
}
