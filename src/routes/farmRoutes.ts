import express from 'express';
import FarmController from '../controllers/farmController';
// import validation from '../validations/validation';
// import FarmValidation from '../validations/farmValidation';
// import utils from '../utils/utils'

const farmerRouter = express.Router();

farmerRouter.post('/',/* utils.protect, validation(FarmValidation.createFarm), */(req, res, next) => FarmController.createFarm(req, res, next))

export default farmerRouter