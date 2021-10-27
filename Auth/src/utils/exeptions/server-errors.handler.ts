import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validation';
import ServerExeption from './service.exeption';
import UnauthorizedExeption from './unauthorized.exeption';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  if (err instanceof ServerExeption) {
    return res.status(500).json({
      code: err.code,
      message: err.message,
    });
  }

  if (err instanceof UnauthorizedExeption) {
    return res.sendStatus(401);
  }

  return res.status(500).json({ message: 'Internal server error' });
};
