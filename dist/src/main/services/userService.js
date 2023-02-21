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
const user_1 = require("../models/user");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const UnauthorizedException_1 = __importDefault(require("../exceptions/UnauthorizedException"));
const BadRequestException_1 = __importDefault(require("../exceptions/BadRequestException"));
const jwtUtils_1 = __importDefault(require("../utils/jwtUtils"));
const UserService = {
    validateCreateData(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInDatabase = yield userRepository_1.default.findByEmail(email);
            if (userInDatabase) {
                throw new BadRequestException_1.default('Email already exists on database');
            }
            return Promise.resolve();
        });
    },
    createFarmer(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateCreateData(user.email);
            const newFarmer = new user_1.User();
            newFarmer.firstName = user.firstName;
            newFarmer.lastName = user.lastName;
            newFarmer.email = user.email;
            newFarmer.password = crypto_js_1.default.MD5(user.password).toString();
            newFarmer.type = user.type;
            return yield userRepository_1.default.save(newFarmer);
        });
    },
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptedPassword = crypto_js_1.default.MD5(password).toString();
            const userInDatabase = yield userRepository_1.default.findByEmailAndPassword(email, encryptedPassword);
            if (!userInDatabase) {
                throw new UnauthorizedException_1.default('Access denied');
            }
            const dataToEcrypt = {
                userId: userInDatabase._id,
                role: userInDatabase.type
            };
            return { token: jwtUtils_1.default.encryptJwt(dataToEcrypt) };
        });
    }
};
exports.default = UserService;
