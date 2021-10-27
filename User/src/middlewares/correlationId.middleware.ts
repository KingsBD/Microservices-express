import { Request, Response, NextFunction } from 'express';
import { getLogId } from '../utils/logger';

// eslint-disable-next-line consistent-return
export default () => (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req?.headers?.['correlation-id']) {
      req.headers['correlation-id'] = getLogId();
    }
    next();
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
