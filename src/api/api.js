import express from 'express';
import bodyParser from 'body-parser';

import pingRoutes from './routes/pingRoutes';
import { userRoutes } from './routes/userRoutes';
import { authRoutes } from './routes/authRoutes';

import { logging } from './middleware/loggingMiddleware';
import { verifyToken } from './middleware/authMiddleware';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logging);

app.use('/', pingRoutes);
app.use('/auth', authRoutes());
// middleware
app.use(verifyToken);

// route
app.use('/users', userRoutes());

module.exports = app;
