import express from 'express';
import bodyParser from 'body-parser';
import PingApiController from './v1/PingApiController';
import UserApiController from './v1/UserApiController';
import LoggingMiddleware from './middleware/LoggingMiddleware';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware
app.use(new LoggingMiddleware().addLogging);

// route
app.use('/users', new UserApiController().routes());
app.use('/', PingApiController);

module.exports = app;
