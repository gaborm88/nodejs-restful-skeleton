import express from 'express';

import UserController from '../../controller/UserController';

module.exports.userRoutes = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    const userController = new UserController();

    userController.findAll()
      .then(item => res.status(200).send(item))
      .catch(err => {
        console.log(err);
        res.status(500).send('Error get all');
      });
  });

  router.post('/', (req, res) => {
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
        res.status(500).send('Creation error');
      });
  });

  router.get('/:id', async (req, res) => {
    const userController = new UserController();

    userController.findById(req.params.id)
      .then(item => res.status(200).send(item))
      .catch(err => {
        console.log(err);
        res.status(500).send('Error get by id');
      });
  });

  router.delete('/:id', (req, res) => {
    const userController = new UserController();

    userController.delete(req.params.id)
      .then(item => res.status(200).send(item))
      .catch(err => {
        console.log(err);
        res.status(500).send('Delete error');
      });
  });

  router.put('/:id', (req, res) => {
    const userController = new UserController();

    userController.update(req.params.id, req.body)
      .then(item => res.status(200).send(item))
      .catch(err => {
        console.log(err);
        res.status(500).send('Update error');
      });
  });

  return router;
}
