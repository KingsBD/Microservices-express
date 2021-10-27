import { UserDao } from '../dao/user.dao';

class UserService {
  userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  searchUser(filter: any): Promise<any> {
    return this.userDao.searchUser(filter);
  }
}

export { UserService };

export default new UserService();
