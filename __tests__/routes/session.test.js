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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const user_1 = require("../mocks/user");
const session_1 = require("../mocks/session");
const jsonwebtoken_1 = require("jsonwebtoken");
describe("POST - /login", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // await request(app).post("/adm")
        // await request(app).post("/artist")
        yield (0, supertest_1.default)(app_1.default).post("/user").send(user_1.user);
    }));
    it("Should to able a login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/login").send(session_1.login);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
        const token = response.body.token;
        expect((0, jsonwebtoken_1.decode)(token)).toHaveProperty("id");
    }));
});
