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
const production_1 = require("../models/production");
const productionRepository_1 = __importDefault(require("../repositories/productionRepository"));
const moment_1 = __importDefault(require("moment"));
const ValidationErrorException_1 = __importDefault(require("../exceptions/ValidationErrorException"));
const farmService_1 = __importDefault(require("./farmService"));
const semesterValues_1 = __importDefault(require("../constants/semesterValues"));
const currencyUtils_1 = __importDefault(require("../utils/currencyUtils"));
const ProductionService = {
    validateRegisterData(farmId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const productionInDatabase = yield productionRepository_1.default.findByFarmAndDate(farmId, date);
            if (productionInDatabase.length > 0) {
                throw new ValidationErrorException_1.default('The production of this day had already been registered');
            }
            return Promise.resolve();
        });
    },
    registerProduction(production) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = (0, moment_1.default)().startOf('day').toDate();
            yield this.validateRegisterData(production.farm, date);
            const newProduction = new production_1.Production();
            newProduction.quantity = production.quantity;
            newProduction.farm = production.farm;
            newProduction.date = date;
            return yield productionRepository_1.default.save(newProduction);
        });
    },
    getProductionByFarmAndBetweenDates(farmId, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            yield farmService_1.default.findByIdOrFail(farmId);
            return yield productionRepository_1.default.findByFarmAndBetweenDates(farmId, from, to);
        });
    },
    getProductionByFarmInMonth(farmId, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const fromDate = (0, moment_1.default)().set({ month: month - 1 }).startOf('month').toDate();
            const toDate = (0, moment_1.default)(fromDate).add(1, 'month').toDate();
            return yield this.getProductionByFarmAndBetweenDates(farmId, fromDate, toDate);
        });
    },
    getSummary(farmId, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const productionDocuments = yield this.getProductionByFarmInMonth(farmId, month);
            let totalProduction = 0;
            const productions = productionDocuments.map((production) => {
                totalProduction += production.quantity;
                return {
                    day: (0, moment_1.default)(production.date).date(),
                    quantity: production.quantity
                };
            });
            return Promise.resolve({
                average: totalProduction / productionDocuments.length,
                productions
            });
        });
    },
    calculatePaidValue(quantityProduced, distanceToFactory, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const isFirstSemester = semesterValues_1.default.FIRST_SEMESTER.includes(month);
            const isDistanceLow = distanceToFactory <= 50 ? true : false;
            const isHighQuantity = quantityProduced > 10000;
            const basePrice = isFirstSemester ? 1.8 : 1.95;
            const pricePerKm = isFirstSemester ? (isDistanceLow ? 0.05 : 0.06) : 0;
            const bonus = isFirstSemester ? 0 : (isHighQuantity ? 0.01 : 0);
            return Promise.resolve((quantityProduced * basePrice) - (pricePerKm * distanceToFactory) + (bonus * quantityProduced));
        });
    },
    getPaidValueByMonth(farmId, month, distanceToFactory) {
        return __awaiter(this, void 0, void 0, function* () {
            const productionDocuments = yield this.getProductionByFarmInMonth(farmId, month);
            const initialValue = 0;
            const totalQuantity = productionDocuments.reduce((accumulator, production) => accumulator + production.quantity, initialValue);
            const brlValue = yield this.calculatePaidValue(totalQuantity, month, distanceToFactory);
            const usdValue = yield currencyUtils_1.default.convertBrlToUsd(brlValue);
            const monthName = (0, moment_1.default)().set({ month: month - 1 }).format('MMMM');
            return {
                month: monthName,
                brl: `R$ ${brlValue.toFixed(2).replace('.', ',')}`,
                usd: `$ ${usdValue.toFixed(2).replace('.', ',')}`
            };
        });
    },
    getPaidValueByYear(farmId, year, distanceToFactory) {
        return __awaiter(this, void 0, void 0, function* () {
            const productions = yield Promise.all([...semesterValues_1.default.FIRST_SEMESTER, ...semesterValues_1.default.SECOND_SEMESTER]
                .map((month) => __awaiter(this, void 0, void 0, function* () { return yield this.getPaidValueByMonth(farmId, month, distanceToFactory); })));
            return Promise.resolve({ productions });
        });
    }
};
exports.default = ProductionService;
