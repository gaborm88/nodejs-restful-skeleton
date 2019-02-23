import mongoose from 'mongoose';
import config from './config';

const connect = mongoose.connect(config.mongodb, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>  console.log("Connected to database!"));

module.exports.connect = () => connect;
