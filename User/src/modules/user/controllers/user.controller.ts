import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../types/user.types';
import {
  traceError,
  traceBegin,
  traceEnd,
  traceFilter,
} from '../../../utils/logger';

export class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  searchUser = async (req: Request, res: Response, next: NextFunction) => {
    const logId = req.headers['correlation-id'] as string;
    try {
      traceBegin('searchUser', logId);
      traceFilter('searchUser', req.query, logId);
      const userFilter = req.query?.filter;
      const result = await this.userService.searchUser(userFilter as User);
      traceEnd('searchUser', logId);
      res.status(200).json(result);
    } catch (error: any) {
      traceError('searchUser', error, logId);
      next(error);
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const logId = req.headers['correlation-id'] as string;
    try {
      traceBegin('getUser', logId);
      traceFilter('getUser', req.params, logId);
      const result = await this.userService.getUser(req.params.id);
      traceEnd('getUser', logId);
      res.status(200).json(result);
    } catch (error: any) {
      traceError('getUser', error, logId);
      next(error);
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const logId = req.headers['correlation-id'] as string;
    try {
      traceBegin('getUsers', logId);
      const result = await this.userService.getUsers();
      traceEnd('getUsers', logId);
      res.status(200).json(result);
    } catch (error: any) {
      traceError('getUsers', error, logId);
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    const logId = req.headers['correlation-id'] as string;
    try {
      traceBegin('createUser', logId);
      traceFilter('createUser', req.body, logId);
      const obUser = await this.userService.createUser(req.body);
      traceEnd('createUser', logId);
      res.status(200).json(obUser);
    } catch (error: any) {
      traceError('createUser', error, logId);
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const logId = req.headers['correlation-id'] as string;
    try {
      traceBegin('updateUser', logId);
      traceFilter('updateUser', req.body, logId);
      const { id, ...userData } = req.body;
      const user = await this.userService.updateUser(userData, id);
      traceEnd('updateUser', logId);
      res.status(200).json(user);
    } catch (error: any) {
      traceError('updateUser', error, logId);
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const logId = req.headers['correlation-id'] as string;
    try {
      traceBegin('deleteUser', logId);
      traceFilter('deleteUser', req.params, logId);
      await this.userService.deleteUser(req.params.id);
      traceEnd('deleteUser', logId);
      res.status(200).json({ meesage: 'SUCESS' });
    } catch (error: any) {
      traceError('deleteUser', error, logId);
      next(error);
    }
  };
}

export default new UserController();
