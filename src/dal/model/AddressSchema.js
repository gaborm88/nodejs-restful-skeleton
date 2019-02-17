import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
});
