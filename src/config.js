import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  appPort: process.env.PORT,
  mongoConnectionUrl: process.env.MONGO_URL,
  secret: process.env.SECRET,
};
