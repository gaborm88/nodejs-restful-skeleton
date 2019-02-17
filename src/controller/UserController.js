import UserDao from '../dal/UserDao';

export default class UserController {

  constructor() {
  }
  // async await not needed, why?
  async findAll(){
    const userDao = new UserDao();
    
    return await userDao.findAll();
  }

  findById(id){
    const userDao = new UserDao();

    return userDao.findById(id);
  }

  async findByIdAwaitVersion(id){
    const userDao = new UserDao();
    
    const a = await userDao.findById(id)
    console.log('asd', a)

    return a;
  }
  
}
