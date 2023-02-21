"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("./BaseError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class ValidationErrorException extends BaseError_1.default {
    constructor(description, name = 'UnprocessableEntity', statusCode = http_status_codes_1.default.UNPROCESSABLE_ENTITY) {
        super(name, statusCode, description);
    }
}
exports.default = ValidationErrorException;
