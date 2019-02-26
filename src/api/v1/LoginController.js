import jwt from 'jsonwebtoken';
import config from '../../config';

class LoginController {

  constructor() {
    LoginController.mockedUsername = 'admin';
    LoginController.mockedPassword = 'password';
  }

  login (req, res) {
    // todo validator
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      res.status(400).send({ success: false });
      return;
    }
    // todo
    if (username === LoginController.mockedUsername &&
          password === LoginController.mockedPassword) {
      const token = jwt.sign({ username: username }, config.secret, { expiresIn: '24h' });
      //res.json({ success: true, token: token });
      res.status(200).send({ success: true, token: token });
    } else {
      res.status(403).send({ success: false });
    }
  }
}

module.exports = LoginController;
