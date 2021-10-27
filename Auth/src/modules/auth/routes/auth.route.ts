import express from 'express';
import { validate } from 'express-validation';
import { loginValidation } from '../dto/login.dto';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', validate(loginValidation, {}, {}), authController.login);

router.get('/check', authController.check);

export default router;
