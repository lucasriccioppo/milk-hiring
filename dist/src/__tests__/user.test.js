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
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const BASE_URL = '/api/user';
const userData = {
    email: 'test@test.com',
    first_name: 'Test',
    last_name: 'Testando',
    password: 'teste123'
};
describe('User tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.connect();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.deleteAll(user_1.User);
        yield database_1.default.close();
    }));
    it('Should create user farmer successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post(BASE_URL)
            .send(userData);
        expect(res.statusCode).toEqual(http_status_codes_1.default.CREATED);
        expect(res.body.email).toEqual('test@test.com');
        expect(res.body.type).toEqual('FARMER');
    }));
    it('Should fail trying to create new user with email already registered', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post(BASE_URL)
            .send(userData);
        expect(res.statusCode).toEqual(http_status_codes_1.default.BAD_REQUEST);
        expect(res.body.description).toEqual('Email already exists on database');
    }));
    it('Should login in the application successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post(`${BASE_URL}/login`)
            .send({
            email: userData.email,
            password: userData.password
        });
        expect(res.statusCode).toEqual(http_status_codes_1.default.OK);
        expect(res.body).toHaveProperty('token');
    }));
    it('Should fail trying to login in the application', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post(`${BASE_URL}/login`)
            .send({
            email: 'anymail@mail.com',
            password: 'testtest'
        });
        expect(res.statusCode).toEqual(http_status_codes_1.default.UNAUTHORIZED);
        expect(res.body.description).toEqual('Access denied');
    }));
});
