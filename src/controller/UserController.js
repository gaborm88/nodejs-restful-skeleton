import UserDao from '../dal/UserDao';

export default class UserController {

  constructor() {
  }

  async findAll(){
    const userDao = new UserDao();
    console.log(this.self)
    const users = await userDao.findAll();
    return users.map(user => this.populateDisplayName(user));
  }

  async findById(id){
    const userDao = new UserDao();

    return await userDao.findById(id).then(u => this.populateDisplayName(u));
  }

  async findByIdAwaitVersion(id){
    const userDao = new UserDao();
    
    return await userDao.findById(id);
  }

  async create(user){
    const userDao = new UserDao();

    return await userDao.create(user);
  }

  async delete(id){
    const userDao = new UserDao();

    return await userDao.deleteById(id);
  }

  async update(id, user){
    const userDao = new UserDao();

    return await userDao.updateById(id, user);
  }

  populateDisplayName(user){
    console.log(user)
    return {
      ...user,
      displayName: `${user.firstName} ${user.lastName}`
    }
  }
}
