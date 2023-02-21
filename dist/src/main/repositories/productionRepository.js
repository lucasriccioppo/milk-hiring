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
const database_1 = __importDefault(require("../configs/database"));
const dataSource = database_1.default.getDataSource();
const repository = dataSource.getMongoRepository(production_1.Production);
const ProductionRepository = {
    save(production) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repository.save(production);
        });
    },
    findByFarmAndDate(farmId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repository.findBy({ farm: farmId, date });
        });
    },
    findByFarmAndBetweenDates(farmId, fromDate, toDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repository.find({
                where: {
                    farm: farmId,
                    date: {
                        $gte: fromDate,
                        $lt: toDate
                    }
                }
            });
        });
    }
};
exports.default = ProductionRepository;
