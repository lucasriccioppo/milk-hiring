"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("lodash/get"));
const UnauthorizedException_1 = __importDefault(require("../exceptions/UnauthorizedException"));
const jwtUtils_1 = __importDefault(require("./jwtUtils"));
const getContext = (req, res, next) => {
    let token = req.headers['authorization'] || '';
    token = token.replace('Bearer ', '');
    if (token == '') {
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwtUtils_1.default.decodeJwt(token);
    }
    catch (err) {
        return next(err);
    }
    const userId = (0, get_1.default)(decodedToken, 'userId' || '') || '';
    req.context = {
        userId
    };
    return next();
};
const protect = (role) => {
    return (req, res, next) => {
        let token = req.headers['authorization'] || '';
        token = token.replace('Bearer ', '');
        jwtUtils_1.default.verifyJwt(token);
        let decodedToken;
        try {
            decodedToken = jwtUtils_1.default.decodeJwt(token);
        }
        catch (err) {
            console.log(`Authentication Error => ${err}`);
            return next(new UnauthorizedException_1.default('Access denied'));
        }
        if (role) {
            if (decodedToken.role !== role) {
                return next(new UnauthorizedException_1.default('Access denied'));
            }
        }
        return next();
    };
};
exports.default = {
    getContext,
    protect
};
