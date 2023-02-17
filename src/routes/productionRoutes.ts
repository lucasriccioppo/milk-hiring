import express from 'express'
import { UserTypes } from '../constants/userTypes';
import ProductionController from '../controllers/productionController'
import utils from '../utils/utils'
// import validation from '../validations/validation';
// import FarmerValidation from '../validations/farmerValidation';

const productionRouter = express.Router();

productionRouter.post('/', utils.protect(), (req, res, next) => ProductionController.registerProduction(req, res, next))
productionRouter.get('/summary/:month', utils.protect(), (req, res, next) => ProductionController.getProductionSummary(req, res, next))
productionRouter.get('/summaryByFarm/:farm/:month', utils.protect(UserTypes.ADMIN), (req, res, next) => ProductionController.getProductionSummaryByFarm(req, res, next))

export default productionRouter