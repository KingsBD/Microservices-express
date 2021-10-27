import { UserService } from '../../user';
import { generateToken, verifyToken } from '../../../utils/token';
import UnauthorizedExeption from '../../../utils/exeptions/unauthorized.exeption';

class AuthService {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(username: string, password: string) {
    const result = await this.userService.searchUser({ email: username });
    if (!result || result?.password !== password)
      throw new UnauthorizedExeption();
    const user = result.toObject();
    user.token = generateToken();
    return user;
  }

  check(token: string) {
    return verifyToken(token);
  }
}

export { AuthService };

export default new AuthService();
