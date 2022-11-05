"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("../config/upload"));
const deleteFileController_1 = require("../controllers/aws/deleteFileController");
const uploadMusicController_1 = require("../controllers/aws/uploadMusicController");
const routes = (0, express_1.Router)();
const upload = (0, multer_1.default)(upload_1.default);
routes.post("/", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "music", maxCount: 1 },
]), uploadMusicController_1.uploadMusicController);
routes.delete("/", deleteFileController_1.deleteFileController);
exports.default = routes;
