"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const farmController_1 = __importDefault(require("../controllers/farmController"));
const validation_1 = __importDefault(require("../validations/validation"));
const farmValidation_1 = __importDefault(require("../validations/farmValidation"));
const middlewareUtils_1 = __importDefault(require("../utils/middlewareUtils"));
const farmRouter = express_1.default.Router();
farmRouter.post('/', middlewareUtils_1.default.protect(), (0, validation_1.default)(farmValidation_1.default.createFarm), (req, res, next) => farmController_1.default.createFarm(req, res, next));
exports.default = farmRouter;
