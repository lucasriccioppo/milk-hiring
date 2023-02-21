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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const farm_1 = require("../models/farm");
const user_1 = require("../models/user");
const production_1 = require("../models/production");
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, } = process.env;
const envDbPortValue = parseInt(DB_PORT || '');
const PORT = Number.isInteger(envDbPortValue) ? envDbPortValue : 27017;
const dataSource = new typeorm_1.DataSource({
    type: 'mongodb',
    host: DB_HOST,
    port: PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [farm_1.Farm, production_1.Production, user_1.User],
    useUnifiedTopology: true,
    authSource: 'admin',
    synchronize: false,
    logging: true
});
const getDataSource = () => dataSource;
const connect = () => __awaiter(void 0, void 0, void 0, function* () { return yield dataSource.initialize(); });
const close = () => __awaiter(void 0, void 0, void 0, function* () { return yield dataSource.destroy(); });
const insert = (collection, document) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSource.getMongoRepository(collection).insertOne(document); });
const deleteAll = (collection) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSource.getMongoRepository(collection).deleteMany({}); });
exports.default = {
    getDataSource,
    connect,
    close,
    insert,
    deleteAll
};
