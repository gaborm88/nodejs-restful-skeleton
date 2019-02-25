import UserSchema from './model/UserSchema';

export default class UserDao {
  
  constructor() {
  }

  async findAll() {
    return await UserSchema.find({}).lean();
  }
 
  async findById(id) {
    return await UserSchema.findById(id).lean();
  }

  async create(user) {
    return await UserSchema.create({
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      addresses: user.addresses,
    });
  }

  async deleteById(id){
    return await UserSchema.findByIdAndRemove(id).lean();
  }

  async updateById(id, user){
    return await UserSchema.findByIdAndUpdate(id, user, { new: true }).lean();
  }
}
