"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userTypes_1 = require("../constants/userTypes");
const productionController_1 = __importDefault(require("../controllers/productionController"));
const middlewareUtils_1 = __importDefault(require("../utils/middlewareUtils"));
const validation_1 = __importDefault(require("../validations/validation"));
const productionValidation_1 = __importDefault(require("../validations/productionValidation"));
const productionRouter = express_1.default.Router();
productionRouter.post('/', middlewareUtils_1.default.protect(), (0, validation_1.default)(productionValidation_1.default.registerProduction), (req, res, next) => productionController_1.default.registerProduction(req, res, next));
productionRouter.get('/summary/:month', middlewareUtils_1.default.protect(), (0, validation_1.default)(productionValidation_1.default.getProductionSummary), (req, res, next) => productionController_1.default.getProductionSummary(req, res, next));
productionRouter.get('/summaryByFarm/:farm/:month', middlewareUtils_1.default.protect(userTypes_1.UserTypes.ADMIN), (0, validation_1.default)(productionValidation_1.default.getProductionSummaryByFarm), (req, res, next) => productionController_1.default.getProductionSummaryByFarm(req, res, next));
productionRouter.get('/monthSummaryByFarm/:farm/:month', middlewareUtils_1.default.protect(userTypes_1.UserTypes.ADMIN), (0, validation_1.default)(productionValidation_1.default.getPaidValueByFarmAndMonth), (req, res, next) => productionController_1.default.getPaidValueByFarmAndMonth(req, res, next));
productionRouter.get('/yearSummaryByFarm/:farm/:year', middlewareUtils_1.default.protect(userTypes_1.UserTypes.ADMIN), (0, validation_1.default)(productionValidation_1.default.getPaidValueByFarmAndYear), (req, res, next) => productionController_1.default.getPaidValueByFarmAndYear(req, res, next));
exports.default = productionRouter;
