import express from 'express';

import User from '../../dal/model/UserSchema';
import UserController from '../../controller/UserController';

export default class UserApiController {

  init(){
    const router = express.Router();
    router.get('/', this.getAllHandler.bind(this));
    router.post('/', this.postHandler.bind(this));
    router.get('/:id', this.getByIdHandler.bind(this));
    router.delete('/:id', this.deleteByIdHandler.bind(this));
    router.put('/:id', this.updateByIdHandler.bind(this));
    return router;
  }

  async getAllHandler(req, res) {
    const userController = new UserController();

    const users = await userController.findAll();

    res.status(200).send(users);
  }

  async getByIdHandler(req, res) {
    const userController = new UserController();
    
    // const user = await userController.findByIdAwaitVersion(req.params.id);

    userController.findByIdAwaitVersion(req.params.id)
      .then(item => res.status(200).send(item))
      .catch(err => {
        console.log(err);
        res.status(500).send('Error get by id')
      });
  }

  postHandler(req, res) {
    //console.log(JSON.stringify(req.body, null, 2));
    const userController = new UserController();

    userController.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      login: req.body.login,
      addresses: req.body.addresses,
    })
      .then(item => res.status(200).send(item))
      .catch(err => {
        console.log(err);
        res.status(500).send('Creation error')
      });
  }

  deleteByIdHandler(req, res){
    const userController = new UserController();

    userController.delete(req.params.id)
      .then(item => res.status(200).send(item))
      .catch(err => {
        console.log(err);
        res.status(500).send('Delete error')
      });
  }

  updateByIdHandler(req, res){
    const userController = new UserController();

    userController.update(req.params.id, req.body)
      .then(item => res.status(200).send(item))
      .catch(err => {
        console.log(err);
        res.status(500).send('Update error')
      });
  }
}

export const router = new UserApiController().router;
