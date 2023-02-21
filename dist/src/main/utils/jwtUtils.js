"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BadRequestException_1 = __importDefault(require("../exceptions/BadRequestException"));
const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;
const secret = JWT_SECRET || '';
const envExpirationTimeValue = parseInt(JWT_EXPIRATION_TIME || '');
const expirationTime = Number.isInteger(envExpirationTimeValue) ? envExpirationTimeValue : 5432;
const encryptJwt = (content, expiresIn = expirationTime) => jsonwebtoken_1.default.sign(content, secret, { expiresIn });
const verifyJwt = (token) => {
    try {
        jsonwebtoken_1.default.verify(token, secret);
    }
    catch (err) {
        console.log(`Error verifying Token: ${err}`);
        throw new BadRequestException_1.default('Error verifying Token');
    }
};
const decodeJwt = (token) => {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch (err) {
        console.log(`Error decoding Token: ${err}`);
        throw new BadRequestException_1.default('Error decoding Token');
    }
};
exports.default = {
    encryptJwt,
    verifyJwt,
    decodeJwt
};
