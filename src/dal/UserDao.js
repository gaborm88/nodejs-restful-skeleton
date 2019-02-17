import UserSchema from './model/UserSchema';

class UserDao {
  
  constructor(){

  }
  async function create(user) {
    UserSchema.create(user, (err, user) => {
        console.log(`created: ${JSON.stringify(user, null, 2)}`);
        if (err) return res.status(500).send('There was a problem adding the information to the database.');
        res.status(200).send(user);
      });
  }

}

module.exports = UserDao;
