import { UserService } from './services/user.service';
import userRoutes from './routes/user.route';
import UserSchema from './model/user.schema';

const userModule = {
  UserService,
  userRoutes,
  UserSchema,
};

export default userModule;

export { UserService, userRoutes, UserSchema };
