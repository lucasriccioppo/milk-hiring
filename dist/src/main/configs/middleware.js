"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../routes/routes"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = __importDefault(require("./errorHandler"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions_1 = __importDefault(require("./swaggerOptions"));
const middlewareUtils_1 = __importDefault(require("../utils/middlewareUtils"));
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.default);
const addMiddlewares = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    app.use((0, compression_1.default)());
    app.use((0, morgan_1.default)('combined'));
    app.use(middlewareUtils_1.default.getContext);
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
    app.use('/api', routes_1.default);
    app.use(errorHandler_1.default);
};
exports.default = addMiddlewares;
