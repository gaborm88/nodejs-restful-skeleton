import mongoose from 'mongoose';
import config from './config';

console.log(config);
module.exports.connect = () => mongoose.connect(config.mongodb);
