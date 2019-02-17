import express from 'express';
import bodyParser from 'body-parser';
import PingApiController from './v1/PingApiController';
import UserApiController from './v1/UserApiController';
import db from '../db';

db.connect();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', new UserApiController().init());
app.use('/', PingApiController);

module.exports = app;
