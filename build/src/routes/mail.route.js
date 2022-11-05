"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailRoute = void 0;
const express_1 = require("express");
const mail_controller_1 = require("../controllers/mail.controller");
const mailRoute = (0, express_1.Router)();
exports.mailRoute = mailRoute;
mailRoute.get("", mail_controller_1.mailController);
