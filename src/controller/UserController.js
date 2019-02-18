import UserDao from '../dal/UserDao';

export default class UserController {

  constructor() {
  }

  findAll(){
    const userDao = new UserDao();
    
    return userDao.findAll();
  }

  findById(id){
    const userDao = new UserDao();

    return userDao.findById(id);
  }

  async findByIdAwaitVersion(id){
    const userDao = new UserDao();
    
    const user = await userDao.findById(id)

    return user;
  }

  create(user){
    const userDao = new UserDao();

    return userDao.create(user);
  }

  delete(id){
    const userDao = new UserDao();

    return userDao.deleteById(id);
  }

  update(id, user){
    const userDao = new UserDao();

    return userDao.updateById(id, user);
  }
}
