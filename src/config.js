import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongodb: process.env.MONGO_URL,
  secret: process.env.SECRET,
};
