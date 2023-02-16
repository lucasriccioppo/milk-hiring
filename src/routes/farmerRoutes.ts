import express from 'express';
import FarmerController from '../controllers/farmerController';
// import validation from '../validations/validation';
// import FarmerValidation from '../validations/farmerValidation';

const farmerRouter = express.Router();

farmerRouter.post('/', /*validation(currencyValidation.createCurrency), */(req, res, next) => FarmerController.createFarmer(req, res, next))
farmerRouter.post('/login', /*validation(currencyValidation.createCurrency), */(req, res, next) => FarmerController.login(req, res, next))

export default farmerRouter