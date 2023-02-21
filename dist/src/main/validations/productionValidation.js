"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const semesterValues_1 = __importDefault(require("../constants/semesterValues"));
const registerProduction = Yup.object({
    quantity: Yup.number().required()
});
const getProductionSummary = Yup.object({
    month: Yup.number().oneOf([...semesterValues_1.default.FIRST_SEMESTER, ...semesterValues_1.default.SECOND_SEMESTER]).required()
});
const getProductionSummaryByFarm = Yup.object({
    farm: Yup.string().min(20).max(30).required(),
    month: Yup.number().oneOf([...semesterValues_1.default.FIRST_SEMESTER, ...semesterValues_1.default.SECOND_SEMESTER]).required()
});
const getPaidValueByFarmAndMonth = Yup.object({
    farm: Yup.string().min(20).max(30).required(),
    month: Yup.number().oneOf([...semesterValues_1.default.FIRST_SEMESTER, ...semesterValues_1.default.SECOND_SEMESTER]).required()
});
const getPaidValueByFarmAndYear = Yup.object({
    farm: Yup.string().min(20).max(30).required(),
    year: Yup.number().required()
});
exports.default = {
    registerProduction,
    getProductionSummary,
    getProductionSummaryByFarm,
    getPaidValueByFarmAndMonth,
    getPaidValueByFarmAndYear
};
