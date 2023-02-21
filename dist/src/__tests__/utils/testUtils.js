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
const crypto_js_1 = __importDefault(require("crypto-js"));
const userTypes_1 = require("../../main/constants/userTypes");
const user_1 = require("../../main/models/user");
const database_1 = __importDefault(require("../../main/configs/database"));
const userService_1 = __importDefault(require("../../main/services/userService"));
const farm_1 = require("../../main/models/farm");
const production_1 = require("../../main/models/production");
const basePassword = 'teste123';
const createDefaultFarmerUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.User();
    user.email = 'test@test.com';
    user.firstName = 'Test';
    user.lastName = 'Testando';
    user.password = crypto_js_1.default.MD5(basePassword).toString();
    user.type = userTypes_1.UserTypes.FARMER;
    const insertedUser = yield database_1.default.insert(user_1.User, user);
    return insertedUser.ops[0];
});
const createDefaultAdminUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.User();
    user.email = 'test@admin.com';
    user.firstName = 'Test';
    user.lastName = 'Testando';
    user.password = crypto_js_1.default.MD5(basePassword).toString();
    user.type = userTypes_1.UserTypes.ADMIN;
    const insertedUser = yield database_1.default.insert(user_1.User, user);
    return insertedUser.ops[0];
});
const getToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const farmerAuthorization = yield userService_1.default.login(user.email, basePassword);
    return farmerAuthorization.token;
});
const createFarm = (name, farmerId, distance) => __awaiter(void 0, void 0, void 0, function* () {
    const farm = new farm_1.Farm();
    farm.name = name;
    farm.owner = farmerId;
    farm.distance = distance;
    const insertedFarm = yield database_1.default.insert(farm_1.Farm, farm);
    return insertedFarm.ops[0];
});
const createProduction = (quantity, date, farmId) => __awaiter(void 0, void 0, void 0, function* () {
    const production = new production_1.Production();
    production.quantity = quantity;
    production.date = date;
    production.farm = farmId;
    const insertedProduction = yield database_1.default.insert(production_1.Production, production);
    return insertedProduction.ops[0];
});
exports.default = {
    createDefaultFarmerUser,
    createDefaultAdminUser,
    getToken,
    createFarm,
    createProduction
};
