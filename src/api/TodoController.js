import express from 'express';
import bodyParser from 'body-parser';

import Todo from '../dal/model/Todo';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// create
router.post('/', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  Todo.create({
    description: req.body.description,
    status: req.body.status,
  }, (err, todo) => {
    console.log(JSON.stringify(todo, null, 2));
    if (err) return res.status(500).send('There was a problem adding the information to the database.');
    res.status(200).send(todo);
  });
});

// get all
router.get('/', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) return res.status(500).send('There was a problem finding the todos.');
    res.status(200).send(todos);
  });
});

// get by id
router.get('/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todos) => {
    if (err) return res.status(500).send('There was a problem finding the todo.');
    res.status(200).send(todos);
  });
});

// delete by id
router.delete('/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) return res.status(500).send('There was a problem deleting the todo.');
    res.status(200).send(`Todo: ${todo.description} was deleted.`);
  });
});

// update by id
router.put('/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, todo) => {
    if (err) return res.status(500).send('There was a problem updating the Todo.');
    res.status(200).send(todo);
  });
});

module.exports = router;
