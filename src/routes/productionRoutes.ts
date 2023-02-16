import express from 'express'
import ProductionController from '../controllers/productionController'
import utils from '../utils/utils'
// import validation from '../validations/validation';
// import FarmerValidation from '../validations/farmerValidation';

const productionRouter = express.Router();

productionRouter.post('/', utils.protect, (req, res, next) => ProductionController.registerProduction(req, res, next))

export default productionRouter