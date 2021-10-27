import { AuthService } from './services/auth.service';
import authRoutes from './routes/auth.route';

const userModule = {
  AuthService,
  authRoutes,
};

export default userModule;

export { AuthService, authRoutes };
