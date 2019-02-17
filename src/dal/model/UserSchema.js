import mongoose from 'mongoose';

import AddressSchema from './AddressSchema';

// created updated

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  login: String,
  addresses: [AddressSchema],
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
