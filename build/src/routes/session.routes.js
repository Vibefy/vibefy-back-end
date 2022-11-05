"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = require("../controllers/user/session.controller");
const router = (0, express_1.Router)();
router.post("", session_controller_1.sessionController);
exports.default = router;
