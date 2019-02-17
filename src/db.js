import mongoose from 'mongoose';
import config from './config';

const connect = () => mongoose.connect(config.mongodb);

module.exports.connect = connect;

// Works as well
// module.exports.connect = () => mongoose.connect(config.mongodb);
