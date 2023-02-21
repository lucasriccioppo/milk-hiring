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
const ValidationErrorException_1 = __importDefault(require("../exceptions/ValidationErrorException"));
const validation = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = Object.assign(Object.assign(Object.assign({}, req.params), req.body), req.query);
    try {
        yield schema.validate(params);
        next();
    }
    catch (err) {
        next(new ValidationErrorException_1.default(err.errors.toString()));
    }
});
exports.default = validation;
