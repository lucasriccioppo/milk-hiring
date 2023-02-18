import express from 'express'
import { UserTypes } from '../constants/userTypes';
import ProductionController from '../controllers/productionController'
import utils from '../utils/utils'
import validation from '../validations/validation';
import ProductionValidation from '../validations/productionValidation';

const productionRouter = express.Router();

productionRouter.post('/', utils.protect(), validation(ProductionValidation.registerProduction), (req, res, next) => ProductionController.registerProduction(req, res, next))
productionRouter.get('/summary/:month', utils.protect(), validation(ProductionValidation.getProductionSummary), (req, res, next) => ProductionController.getProductionSummary(req, res, next))
productionRouter.get('/summaryByFarm/:farm/:month', utils.protect(UserTypes.ADMIN), validation(ProductionValidation.getProductionSummaryByFarm), (req, res, next) => ProductionController.getProductionSummaryByFarm(req, res, next))
productionRouter.get('/monthSummaryByFarm/:farm/:month', utils.protect(UserTypes.ADMIN), validation(ProductionValidation.getPaidValueByFarmAndMonth), (req, res, next) => ProductionController.getPaidValueByFarmAndMonth(req, res, next))
productionRouter.get('/yearSummaryByFarm/:farm/:year', utils.protect(UserTypes.ADMIN), validation(ProductionValidation.getPaidValueByFarmAndYear), (req, res, next) => ProductionController.getPaidValueByFarmAndYear(req, res, next))

export default productionRouter