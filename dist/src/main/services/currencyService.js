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
const freeCurrencyApi_1 = __importDefault(require("../integrations/freeCurrencyApi"));
const redisUtils_1 = __importDefault(require("../utils/redisUtils"));
const utils_1 = __importDefault(require("../utils/utils"));
const CurrencyService = {
    getCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            const isTest = utils_1.default.isTestEnvironment();
            let currenciesInRedis = isTest ? null : yield redisUtils_1.default.getKey('currencies');
            if (!currenciesInRedis) {
                const currenciesInApi = yield freeCurrencyApi_1.default.getCurrencies();
                isTest ? Promise.resolve() : yield redisUtils_1.default.setKey('currencies', JSON.stringify(currenciesInApi));
                return currenciesInApi;
            }
            return JSON.parse(currenciesInRedis.toString());
        });
    }
};
exports.default = CurrencyService;
