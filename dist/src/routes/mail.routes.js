"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailRoutes = void 0;
const express_1 = require("express");
const mail_controller_1 = require("../controllers/mail.controller");
const routes = (0, express_1.Router)();
const mailRoutes = () => {
    routes.get("", mail_controller_1.mailController);
    return routes;
};
exports.mailRoutes = mailRoutes;
