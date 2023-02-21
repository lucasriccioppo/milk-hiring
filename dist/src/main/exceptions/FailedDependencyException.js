"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("./BaseError"));
const http_status_codes_1 = require("http-status-codes");
class FailedDependencyException extends BaseError_1.default {
    constructor(description, name = 'FailedDependency', statusCode = http_status_codes_1.StatusCodes.FAILED_DEPENDENCY) {
        super(name, statusCode, description);
    }
}
exports.default = FailedDependencyException;
