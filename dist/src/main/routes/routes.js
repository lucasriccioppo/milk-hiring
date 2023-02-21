"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const farmRoutes_1 = __importDefault(require("./farmRoutes"));
const productionRoutes_1 = __importDefault(require("./productionRoutes"));
const router = express_1.default.Router();
router.use('/user', userRoutes_1.default);
router.use('/farm', farmRoutes_1.default);
router.use('/production', productionRoutes_1.default);
exports.default = router;
