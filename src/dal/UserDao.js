import UserSchema from './model/UserSchema';

export default class UserDao {
  
  constructor() {
    console.log("UserDao.constructor")
  }
  // TODO better error handling
  async findAll() {
    try {
      return await UserSchema.find({});
    } catch(err) {
      console.log(err);
    }
  }
 
  findById(id) {
    return UserSchema.findById(id);
  }
/*
  create(req, res) {
    console.log(JSON.stringify(req.body, null, 2));
    UserSchema.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      login: req.body.login,
      addresses: req.body.addresses,
    }, (err, user) => {
      console.log(`created: ${JSON.stringify(user, null, 2)}`);
      if (err) return res.status(500).send('There was a problem adding the information to the database.');
      res.status(200).send(user);
    });
  }

  deleteByIdHandler(req, res){
    UserSchema.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) return res.status(500).send('There was a problem deleting the user.');
      res.status(200).send(`User: ${user.lastName} ${user.firstName} was deleted.`);
    });
  }

  updateByIdHandler(req, res){
    UserSchema.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
      if (err) return res.status(500).send('There was a problem updating the user.');
      res.status(200).send(user);
    });
  }
*/
}

module.exports = UserDao;
