"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIdMiddleware = void 0;
const uuid_validate_1 = __importDefault(require("uuid-validate"));
const appError_1 = require("../error/appError");
const checkIdMiddleware = (req, res, next) => {
    const id = req.params.id;
    const validateID = (0, uuid_validate_1.default)(id, 4);
    if (!validateID) {
        throw new appError_1.AppError(400, "Id is not valid");
    }
    next();
};
exports.checkIdMiddleware = checkIdMiddleware;
