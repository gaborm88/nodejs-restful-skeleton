import express from 'express';
import TodoController from './api/TodoController';
import PingController from './api/PingController';
import db from './db';

db.connect();

const app = express();

app.use('/todos', TodoController);
app.use('/', PingController);

module.exports = app;
