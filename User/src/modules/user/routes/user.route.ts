import express from 'express';
import { validate } from 'express-validation';
import { userParams } from '../dto/search-user.dto';
import { user } from '../dto/user.dto';
import userController from '../controllers/user.controller';

const router = express.Router();

// Create
router.put('/', validate(user, {}, {}), userController.createUser);

// Modify
router.post('/', validate(user, {}, {}), userController.updateUser);

// Delete
router.delete('/:id', validate(userParams, {}, {}), userController.deleteUser);

// Get user by filter
router.get('/search', userController.searchUser);

// Get user
router.get('/:id', validate(userParams, {}, {}), userController.getUser);

// Get users
router.get('/', userController.getUsers);

export default router;
