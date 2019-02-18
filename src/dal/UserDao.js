import UserSchema from './model/UserSchema';

export default class UserDao {
  
  constructor() {
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

  create(user) {
    return UserSchema.create({
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      addresses: user.addresses,
    });
  }

  deleteById(id){
    return UserSchema.findByIdAndRemove(id)
  }

  updateById(id, user){
    return UserSchema.findByIdAndUpdate(id, user, { new: true });
  }
}
