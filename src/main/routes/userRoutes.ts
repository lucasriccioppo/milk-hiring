import express from 'express';
import UserController from '../controllers/userController';
import validation from '../validations/validation';
import UserValidation from '../validations/userValidation';

const userRouter = express.Router();

userRouter.post('/', validation(UserValidation.createFarmer), (req, res, next) => UserController.createFarmer(req, res, next))
userRouter.post('/login', validation(UserValidation.login), (req, res, next) => UserController.login(req, res, next))

export default userRouter