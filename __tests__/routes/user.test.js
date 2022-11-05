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
describe("POST - /user", () => {
    it("Should to be able a creation of user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/user").send(user_1.user);
        const body = response.body;
        expect(typeof body).toBe("object");
        expect(response.statusCode).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("email");
        expect(body).toHaveProperty("password");
        expect(body).toHaveProperty("avatar_img");
        expect(body).toHaveProperty("payment");
        expect(body).toHaveProperty("playlist");
        expect(Array.isArray(body.playlist)).toBeTruthy();
        expect(body).toHaveProperty("created_At");
        expect(body).toHaveProperty("updated_At");
    }));
    it("Should not to be able a creation of user with duplicate email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/user").send(user_1.user);
        expect(response.statusCode).toBe(403);
        expect(response.body).toHaveProperty("message");
    }));
    it("Should not to be able a creation of user without fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/user").send(user_1.userWithout);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
});
describe("POST - /user/profile/img", () => {
    it("Should to be able sending image to user profile", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginRes = yield (0, supertest_1.default)(app_1.default).post("/login").send(session_1.login);
        const token = loginRes.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).post("/user/profile/img").set("Authorization", `Bearer ${token}`).attach("img", "../mocks/user/mock_img.png");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
    }));
    it("Should not to be able sending image without img field", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginRes = yield (0, supertest_1.default)(app_1.default).post("/login").send(session_1.login);
        const token = loginRes.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).post("/user/profile/img").set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    it("Should not to be able sending image without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/user/profile/img").attach("img", "../mocks/user/mock_img.png");
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    it("Should not to be able sending image in unknown format", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginRes = yield (0, supertest_1.default)(app_1.default).post("/login").send(session_1.login);
        const token = loginRes.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).post("/user/profile/img").set("Authorization", `Bearer ${token}`).attach("img", "../mocks/user/mock_img.pngg");
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
});
describe("GET - /user/profile", () => {
    it("Should not be able show user profile", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginRes = yield (0, supertest_1.default)(app_1.default).post("/login").send(session_1.login);
        const token = loginRes.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).get("/user/profile").set("Authorization", `Bearer ${token}`);
        const body = response.body;
        expect(typeof body).toBe("object");
        expect(response.statusCode).toBe(200);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("email");
        expect(body).toHaveProperty("password");
        expect(body).toHaveProperty("avatar_img");
        expect(body).toHaveProperty("payment");
        expect(body).toHaveProperty("playlist");
        expect(Array.isArray(body.playlist)).toBeTruthy();
        expect(body).toHaveProperty("created_At");
        expect(body).toHaveProperty("updated_At");
    }));
    it("Should not be able show user profile without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/user/profile");
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
});
describe("PATCH - user/profile", () => {
    it("Should be able an edit the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginRes = yield (0, supertest_1.default)(app_1.default).post("/login").send(session_1.login);
        const token = loginRes.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).patch("/user/profile").set("Authorization", `Bearer ${token}`).send(user_1.userUpdated);
        const body = response.body;
        expect(response.statusCode).toBe(200);
        expect(body.email).toBe(user_1.userUpdated.email);
        expect(body.name).toBe(user_1.userUpdated.name);
        expect(body.password).toBe(user_1.userUpdated.password);
    }));
    it("Should not be able an edit the user without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginRes = yield (0, supertest_1.default)(app_1.default).post("/login").send(session_1.login);
        const token = loginRes.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).patch("/user/profile").send(user_1.userUpdated);
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
});
describe("DELETE /user/profile", () => {
    it("Should be able a delete the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginRes = yield (0, supertest_1.default)(app_1.default).post("/login").send(session_1.login);
        const token = loginRes.body.token;
        const response = yield (0, supertest_1.default)(app_1.default).delete("/user/profile").set("Authorization", `Bearer : ${token}`);
        expect(response.statusCode).toBe(204);
    }));
    it("Should not be able a delete the user without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete("/user/profile");
        expect(response.statusCode).toBe(401);
    }));
});
