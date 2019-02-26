import express from 'express';
import bodyParser from 'body-parser';
import PingApiController from './v1/PingApiController';
import UserApiController from './v1/UserApiController';
import LoginController from './v1/LoginController';
import LoggingMiddleware from './middleware/LoggingMiddleware';
import AuthMiddleware from './middleware/AuthMiddleware';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// very bad approach to use class
app.use('/login', new LoginController().login); // route
// middleware
app.use(new LoggingMiddleware().addLogging);
app.use(new AuthMiddleware().verifyToken);

// route
app.use('/users', new UserApiController().routes());
app.use('/', PingApiController);

module.exports = app;
