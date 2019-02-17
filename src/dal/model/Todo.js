import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  description: String,
  status: String,
});
mongoose.model('Todo', TodoSchema);

module.exports = mongoose.model('Todo');
