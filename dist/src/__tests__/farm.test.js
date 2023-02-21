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
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const testUtils_1 = __importDefault(require("./utils/testUtils"));
const BASE_URL = '/api/farm';
let farmerToken;
let userId;
describe('Farm tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.connect();
        const farmerUser = yield testUtils_1.default.createDefaultFarmerUser();
        userId = farmerUser._id.toString();
        farmerToken = yield testUtils_1.default.getToken(farmerUser);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.deleteAll(farm_1.Farm);
        yield database_1.default.deleteAll(user_1.User);
        yield database_1.default.close();
    }));
    it('Should create a farm for logged user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post(BASE_URL)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send({
            name: 'Test Farm',
            distance: 150
        });
        expect(res.statusCode).toEqual(http_status_codes_1.default.CREATED);
        expect(res.body.name).toEqual('Test Farm');
        expect(res.body.owner).toEqual(userId);
    }));
    it('Should fail trying to create a farm for the logged user with farm already created', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post(BASE_URL)
            .set('Authorization', `Bearer ${farmerToken}`)
            .send({
            name: 'Test Farm 2',
            distance: 200
        });
        expect(res.statusCode).toEqual(http_status_codes_1.default.UNPROCESSABLE_ENTITY);
        expect(res.body.description).toEqual('Farm for this farmer already exists');
    }));
});
