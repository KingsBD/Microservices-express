import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import {
  traceError,
  traceBegin,
  traceEnd,
  traceFilter,
} from '../../../utils/logger';

export class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const logId = req.headers['correlation-id'] as string;
    try {
      traceBegin('login', logId);
      traceFilter('login', req.body, logId);
      const result = await this.authService.login(
        req.body.username,
        req.body.password,
      );
      traceEnd('login', logId);
      res.status(200).json(result);
    } catch (error: any) {
      traceError('login', error, logId);
      next(error);
    }
  };

  check = (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization
      ? req?.headers?.authorization.split(' ')[1]
      : '';
    const logId = req.headers['correlation-id'] as string;
    try {
      traceBegin('check', logId);
      traceFilter('check', token, logId);
      this.authService.check(token);
      traceEnd('check', logId);
      res.sendStatus(200);
    } catch (error: any) {
      traceError('check', error, logId);
      next(error);
    }
  };
}

export default new AuthController();
