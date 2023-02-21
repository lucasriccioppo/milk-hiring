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
const axios_1 = __importDefault(require("axios"));
const FailedDependencyException_1 = __importDefault(require("../exceptions/FailedDependencyException"));
const { CURRENCY_API_KEY, CURRENCY_API_URL } = process.env;
const FreeCurrencyApi = {
    getCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${CURRENCY_API_URL}/latest?apikey=${CURRENCY_API_KEY}`);
                return Promise.resolve(response.data.data);
            }
            catch (err) {
                console.log(err);
                throw new FailedDependencyException_1.default('Error fetching currencies');
            }
        });
    }
};
exports.default = FreeCurrencyApi;
