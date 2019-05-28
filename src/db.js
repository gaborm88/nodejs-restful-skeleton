import mongoose from 'mongoose';

module.exports.connect = (connectionUrl) => {
  mongoose.connect(connectionUrl, { useNewUrlParser: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => console.log('Connected to database:', connectionUrl));

  return db;
};
