import express from 'express';
import UserController from '../controllers/userController';
// import validation from '../validations/validation';
// import FarmerValidation from '../validations/farmerValidation';

const userRouter = express.Router();

userRouter.post('/', /*validation(currencyValidation.createCurrency), */(req, res, next) => UserController.createFarmer(req, res, next))
userRouter.post('/login', /*validation(currencyValidation.createCurrency), */(req, res, next) => UserController.login(req, res, next))

export default userRouter