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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${__dirname}/.test.env` });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../main/server"));
const database_1 = __importDefault(require("../main/configs/database"));
const user_1 = require("../main/models/user");
const farm_1 = require("../main/models/farm");
const production_1 = require("../main/models/production");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const testUtils_1 = __importDefault(require("./utils/testUtils"));
const moment_1 = __importDefault(require("moment"));
const nock_1 = __importDefault(require("nock"));
const currencyApiMockResponse_1 = __importDefault(require("./utils/currencyApiMockResponse"));
const BASE_URL = '/api/production';
let farmerToken;
let adminToken;
let farmerId;
let farmId;
const now = (0, moment_1.default)().set({ date: 15 }); // just to make sure that we can add and subtract days and still be on te same month
const month = now.month() + 1;
describe('Production tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.connect();
        const farmerUser = yield testUtils_1.default.createDefaultFarmerUser();
        farmerId = farmerUser._id.toString();
        farmerToken = yield testUtils_1.default.getToken(farmerUser);
        const adminUser = yield testUtils_1.default.createDefaultAdminUser();
        adminToken = yield testUtils_1.default.getToken(adminUser);
        const farm = yield testUtils_1.default.createFarm('Happy Farm', farmerId, 150);
        farmId = farm._id.toString();
        (0, nock_1.default)(`https://api.freecurrencyapi.com/v1`)
            .persist()
            .get('/latest?apikey=u5ne8urXAUWfbHXjVjvYhxcLbW18tih4pZnCwRLV')
            .reply(http_status_codes_1.default.OK, currencyApiMockResponse_1.default);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.deleteAll(production_1.Production);
        yield database_1.default.deleteAll(farm_1.Farm);
        yield database_1.default.deleteAll(user_1.User);
        yield database_1.default.close();
    }));
    it('Should create production of the day of the farm successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post(BASE_URL)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send({
            quantity: 20
        });
        const date = (0, moment_1.default)().startOf('day').toDate();
        expect(res.statusCode).toEqual(http_status_codes_1.default.CREATED);
        expect(res.body.quantity).toEqual(20);
        expect(res.body.farm).toEqual(farmId);
        expect(new Date(res.body.date)).toEqual(date);
    }));
    it('Should fail creating production of the day of the farm', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post(BASE_URL)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send({
            quantity: 20
        });
        expect(res.statusCode).toEqual(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
        expect(res.body.description).toEqual('The production of this day had already been registered');
    }));
    it('Should get production summary successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.deleteAll(production_1.Production);
        const now = (0, moment_1.default)();
        const month = now.month() + 1;
        yield testUtils_1.default.createProduction(15, now.startOf('day').toDate(), farmId);
        yield testUtils_1.default.createProduction(8, now.startOf('day').toDate(), farmId);
        yield testUtils_1.default.createProduction(7, now.startOf('day').toDate(), farmId);
        const res = yield (0, supertest_1.default)(server_1.default)
            .get(`${BASE_URL}/summary/${month}`)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send();
        expect(res.statusCode).toEqual(http_status_codes_1.default.OK);
        expect(res.body.average).toEqual(10);
        expect(res.body.productions.length).toEqual(3);
    }));
    it('Should get production summary with admin user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.deleteAll(production_1.Production);
        yield testUtils_1.default.createProduction(15, now.subtract(1, 'day').startOf('day').toDate(), farmId);
        yield testUtils_1.default.createProduction(8, now.startOf('day').toDate(), farmId);
        yield testUtils_1.default.createProduction(7, now.startOf('day').toDate(), farmId);
        const res = yield (0, supertest_1.default)(server_1.default)
            .get(`${BASE_URL}/summaryByFarm/${farmId}/${month}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send();
        expect(res.statusCode).toEqual(http_status_codes_1.default.OK);
        expect(res.body.average).toEqual(10);
        expect(res.body.productions.length).toEqual(3);
    }));
    it('Should get production month summary successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const monthName = (0, moment_1.default)().set({ month: month - 1 }).format('MMMM');
        yield database_1.default.deleteAll(production_1.Production);
        yield testUtils_1.default.createProduction(15, now.startOf('day').toDate(), farmId);
        yield testUtils_1.default.createProduction(8, now.startOf('day').toDate(), farmId);
        yield testUtils_1.default.createProduction(7, now.startOf('day').toDate(), farmId);
        const res = yield (0, supertest_1.default)(server_1.default)
            .get(`${BASE_URL}/monthSummaryByFarm/${farmId}/${month}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send();
        const responseBrlValue = parseFloat(res.body.brl.replace('R$ ', '').replace(',', '.'));
        const responseUsdValue = parseFloat(res.body.usd.replace('$ ', '').replace(',', '.'));
        expect(res.statusCode).toEqual(http_status_codes_1.default.OK);
        expect(res.body.month).toEqual(monthName);
        expect(responseBrlValue).toEqual(58.50);
        expect(responseUsdValue).toEqual(11.27);
    }));
    it('Should fail trying to get production month summary with farmer token', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .get(`${BASE_URL}/monthSummaryByFarm/${farmId}/${month}`)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send();
        expect(res.statusCode).toEqual(http_status_codes_1.default.UNAUTHORIZED);
        expect(res.body.description).toEqual('Access denied');
    }));
    it('Should get production year summary successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.deleteAll(production_1.Production);
        yield testUtils_1.default.createProduction(15, now.startOf('day').toDate(), farmId);
        yield testUtils_1.default.createProduction(8, now.startOf('day').toDate(), farmId);
        yield testUtils_1.default.createProduction(7, now.startOf('day').toDate(), farmId);
        const res = yield (0, supertest_1.default)(server_1.default)
            .get(`${BASE_URL}/yearSummaryByFarm/${farmId}/2023`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send();
        expect(res.statusCode).toEqual(http_status_codes_1.default.OK);
        expect(res.body.productions.length).toEqual(12);
    }));
});
