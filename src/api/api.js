import express from 'express';

import pingRoutes from './routes/pingRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

import { logging } from './middleware/loggingMiddleware';

const app = express();

app.use(express.json({ extended: false }));

app.use(logging);

app.use('/', pingRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

module.exports = app;
