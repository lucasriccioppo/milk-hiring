"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const validation_1 = __importDefault(require("../validations/validation"));
const userValidation_1 = __importDefault(require("../validations/userValidation"));
const userRouter = express_1.default.Router();
userRouter.post('/', (0, validation_1.default)(userValidation_1.default.createFarmer), (req, res, next) => userController_1.default.createFarmer(req, res, next));
userRouter.post('/login', (0, validation_1.default)(userValidation_1.default.login), (req, res, next) => userController_1.default.login(req, res, next));
exports.default = userRouter;
