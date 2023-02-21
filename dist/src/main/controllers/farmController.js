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
const farmService_1 = __importDefault(require("../services/farmService"));
/**
 * @swagger
 * /api/farm:
 *   post:
 *     description: Create a new farm
 *     tags: ['Farm']
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
 *               name:
 *                 type: string
 *                 example: Fazenda BovControl
 *               distance:
 *                 type: number
 *                 example: 100
 *     responses:
 *       '201':
 *         description: A successful response
 *       '422':
 *         description: Unprocessable Entity
 */
const createFarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, distance } = req.body;
    try {
        const owner = req.context.userId;
        const createdFarm = yield farmService_1.default.createFarm({ name, owner, distance });
        return res.status(http_status_codes_1.default.CREATED).json(createdFarm);
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    createFarm
};
