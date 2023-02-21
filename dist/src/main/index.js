"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = __importDefault(require("./server"));
const database_1 = __importDefault(require("./configs/database"));
const redis_1 = __importDefault(require("./configs/redis"));
database_1.default.connect();
redis_1.default.connect();
const PORT = process.env.PORT || 3333;
server_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
