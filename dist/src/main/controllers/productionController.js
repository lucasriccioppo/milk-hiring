"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const productionService_1 = __importDefault(require("../services/productionService"));
const farmService_1 = __importDefault(require("../services/farmService"));
/**
 * @swagger
 * /api/production:
 *   post:
 *     description: Register daily milk production
 *     tags: ['Production']
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: Login object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 50
 *     responses:
 *       '201':
 *         description: A successful response
 *       '404':
 *         description: Not found
 *       '422':
 *         description: Unprocessable Entity
 */
const registerProduction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity } = req.body;
    try {
        const userId = req.context.userId;
        const farm = yield farmService_1.default.findByUserOrFail(userId);
        const registeredProduction = yield productionService_1.default.registerProduction({ quantity, farm: farm._id.toString() });
        return res.status(http_status_codes_1.default.CREATED).json(registeredProduction);
    }
    catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /api/production/summary/{month}:
 *   get:
 *     description: Get a summary of milk production for the farm of the user logged in
 *     tags: ['Production']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: month
 *         description: The desired month to get summary. January is 1 and December is 12
 *         required: true
 *         schema:
 *           type: number
 *           example: 5
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Not found
 */
const getProductionSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { month } = req.params;
    try {
        const userId = req.context.userId;
        const farm = yield farmService_1.default.findByUserOrFail(userId);
        const registeredProduction = yield productionService_1.default.getSummary(farm._id.toString(), parseInt(month));
        return res.status(http_status_codes_1.default.OK).json(registeredProduction);
    }
    catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /api/production/summaryByFarm/{farm}/{month}:
 *   get:
 *     description: Get a summary of milk production given an farm
 *     tags: ['Production']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: farm
 *         description: Id of the farm desired
 *         required: true
 *         schema:
 *           type: string
 *           example: 63ef970f791c1336cc40a915
 *       - in: path
 *         name: month
 *         description: The desired month to get summary. January is 1 and December is 12
 *         required: true
 *         schema:
 *           type: number
 *           example: 8
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Not found
 */
const getProductionSummaryByFarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { farm, month } = req.params;
    try {
        const registeredProduction = yield productionService_1.default.getSummary(farm, parseInt(month));
        return res.status(http_status_codes_1.default.OK).json(registeredProduction);
    }
    catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /api/production/monthSummaryByFarm/{farm}/{month}:
 *   get:
 *     description: Get a summary of monthly milk production given an farm
 *     tags: ['Production']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: farm
 *         description: Id of the farm desired
 *         required: true
 *         schema:
 *           type: string
 *           example: 63ef970f791c1336cc40a915
 *       - in: path
 *         name: month
 *         description: The desired month to get summary. January is 1 and December is 12
 *         required: true
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Not found
 */
const getPaidValueByFarmAndMonth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { farm, month } = req.params;
    try {
        const farmInDatabase = yield farmService_1.default.findByIdOrFail(farm);
        const registeredProduction = yield productionService_1.default.getPaidValueByMonth(farm, parseInt(month), farmInDatabase.distance);
        return res.status(http_status_codes_1.default.OK).json(registeredProduction);
    }
    catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /api/production/yearSummaryByFarm/{farm}/{year}:
 *   get:
 *     description: Get a summary of yearly milk production given an farm
 *     tags: ['Production']
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: farm
 *         description: Id of the farm desired
 *         required: true
 *         schema:
 *           type: string
 *           example: 63ef970f791c1336cc40a915
 *       - in: path
 *         name: year
 *         description: The desired year to get summary.
 *         required: true
 *         schema:
 *           type: number
 *           example: 2023
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Not found
 */
const getPaidValueByFarmAndYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { farm, year } = req.params;
    try {
        const farmInDatabase = yield farmService_1.default.findByIdOrFail(farm);
        const registeredProduction = yield productionService_1.default.getPaidValueByYear(farm, parseInt(year), farmInDatabase.distance);
        return res.status(http_status_codes_1.default.OK).json(registeredProduction);
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    registerProduction,
    getProductionSummary,
    getProductionSummaryByFarm,
    getPaidValueByFarmAndMonth,
    getPaidValueByFarmAndYear
};
