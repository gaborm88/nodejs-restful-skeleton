import express from 'express';
import bodyParser from 'body-parser';

import User from '../../dal/model/UserSchema';

export default class UserApiController {

  constructor () {}

  init(){
    const router = express.Router();
    router.get('/', this.getAllHandler.bind(this));
    router.post('/', this.postHandler.bind(this));
    router.get('/:id', this.getByIdHandler.bind(this));
    router.delete('/:id', this.deleteByIdHandler.bind(this));
    router.put('/:id', this.updateByIdHandler.bind(this));
    return router;
  }

  getAllHandler(req, res) {
    User.find({}, (err, users) => {
      if (err) return res.status(500).send('There was a problem finding the users.');
      res.status(200).send(users);
    });
  }

  getByIdHandler(req, res) {
    User.findById(req.params.id, (err, user) => {
      if (err) return res.status(500).send('There was a problem finding the user.');
      res.status(200).send(user);
    });
  }

  postHandler(req, res) {
    console.log(JSON.stringify(req.body, null, 2));
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      login: req.body.login,
      addresses: req.body.addresses,
    }, (err, user) => {
      console.log(`created: ${JSON.stringify(user, null, 2)}`);
      if (err) return res.status(500).send('There was a problem adding the information to the database.');
      res.status(200).send(user);
    });
  }

  deleteByIdHandler(req, res){
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) return res.status(500).send('There was a problem deleting the user.');
      res.status(200).send(`User: ${user.lastName} ${user.firstName} was deleted.`);
    });
  }

  updateByIdHandler(req, res){
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
      if (err) return res.status(500).send('There was a problem updating the user.');
      res.status(200).send(user);
    });
  }
}

export const router = new UserApiController().router;
