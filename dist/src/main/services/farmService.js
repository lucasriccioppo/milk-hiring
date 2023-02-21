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
const ResourceNotFoundException_1 = __importDefault(require("../exceptions/ResourceNotFoundException"));
const farm_1 = require("../models/farm");
const farmRepository_1 = __importDefault(require("../repositories/farmRepository"));
const ValidationErrorException_1 = __importDefault(require("../exceptions/ValidationErrorException"));
const FarmService = {
    validateCreateData(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const farmInDatabase = yield farmRepository_1.default.findByUserId(userId);
            if (farmInDatabase) {
                throw new ValidationErrorException_1.default('Farm for this farmer already exists');
            }
            return Promise.resolve();
        });
    },
    createFarm(farm) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateCreateData(farm.owner);
            const newFarm = new farm_1.Farm();
            newFarm.name = farm.name;
            newFarm.owner = farm.owner;
            newFarm.distance = farm.distance;
            return yield farmRepository_1.default.save(newFarm);
        });
    },
    findByUserOrFail(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const farm = yield farmRepository_1.default.findByUserId(userId);
            if (!farm) {
                throw new ResourceNotFoundException_1.default('Farm was not found');
            }
            return farm;
        });
    },
    findByIdOrFail(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const farm = yield farmRepository_1.default.findById(userId);
            if (!farm) {
                throw new ResourceNotFoundException_1.default('Farm not found');
            }
            return Promise.resolve(farm);
        });
    },
};
exports.default = FarmService;
