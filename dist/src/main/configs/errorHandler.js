"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const errorHandler = (err, req, res, next) => {
    console.log(err);
    return res.status(err.statusCode || http_status_codes_1.default.INTERNAL_SERVER_ERROR).send(err);
};
exports.default = errorHandler;
