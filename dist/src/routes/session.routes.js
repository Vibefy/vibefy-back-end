"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = require("express");
const session_1 = require("../schema/session");
const session_controller_1 = require("../controllers/user/session.controller");
const schemaValidation_middleware_1 = require("../middleware/schemaValidation.middleware");
const routes = (0, express_1.Router)();
const sessionRoutes = () => {
    routes.post("", (0, schemaValidation_middleware_1.schemaValidationMiddleware)(session_1.login), session_controller_1.sessionController);
    return routes;
};
exports.sessionRoutes = sessionRoutes;
