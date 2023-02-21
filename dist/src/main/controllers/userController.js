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
const userTypes_1 = require("../constants/userTypes");
const userService_1 = __importDefault(require("../services/userService"));
/**
 * @swagger
 * /api/user:
 *   post:
 *     description: Create a new farmer / user
 *     tags: ['User']
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
 *               first_name:
 *                 type: string
 *                 example: Lucas
 *               last_name:
 *                 type: string
 *                 example: Silva
 *               email:
 *                 type: string
 *                 example: lucassilva@gmail.com
 *               password:
 *                 type: string
 *                 example: senha123456
 *     responses:
 *       '201':
 *         description: A successful response
 *       '400':
 *         description: Farmer with this email already exists
 */
const createFarmer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name: firstName, last_name: lastName, email, password } = req.body;
    try {
        const createdFarmer = yield userService_1.default.createFarmer({ firstName, lastName, email, password, type: userTypes_1.UserTypes.FARMER });
        return res.status(http_status_codes_1.default.CREATED).json(createdFarmer);
    }
    catch (err) {
        next(err);
    }
});
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     description: Log in the user
 *     tags: ['User']
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
 *               email:
 *                 type: string
 *                 example: lucassilva@gmail.com
 *               password:
 *                 type: string
 *                 example: senha123456
 *     responses:
 *       '201':
 *         description: A successful response
 *       '401':
 *         description: Unauthorized
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield userService_1.default.login(email, password);
        return res.status(http_status_codes_1.default.OK).json(token);
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    createFarmer,
    login
};
