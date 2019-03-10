import express from 'express';
import bodyParser from 'body-parser';
import pingApiController from './v1/PingApiController';
import UserApiController from './v1/UserApiController';
import LoginController from './v1/LoginController';
import LoggingMiddleware from './middleware/LoggingMiddleware';
import AuthMiddleware from './middleware/AuthMiddleware';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(new LoggingMiddleware().addLogging);

// not the best approach to use class
app.use('/', pingApiController);
app.use('/login', new LoginController().login);
// middleware
app.use(new AuthMiddleware().verifyToken);

// route
// todo add routes folder - except ping for auth
app.use('/users', new UserApiController().routes());

module.exports = app;
