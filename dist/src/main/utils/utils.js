"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { NODE_ENV } = process.env;
const Utils = {
    isTestEnvironment() {
        return NODE_ENV === 'test';
    }
};
exports.default = Utils;
