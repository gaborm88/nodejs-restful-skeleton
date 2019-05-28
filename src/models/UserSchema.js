import mongoose from 'mongoose';

import Address from './AddressSchema';

// TODO created updated

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  login: {
    type: String,
  },
  addresses: {
    type: [Address.schema],
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
