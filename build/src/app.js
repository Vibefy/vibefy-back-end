"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const session_routes_1 = __importDefault(require("./routes/session.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const aws_routes_1 = __importDefault(require("./routes/aws.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const mail_route_1 = require("./routes/mail.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/user", user_routes_1.default);
app.use("/login", session_routes_1.default);
app.use("/file", aws_routes_1.default);
app.use("/send-email", mail_route_1.mailRoute);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.get("/terms", (req, res) => {
    return res.json({
        message: "Termos de Serviço",
    });
});
app.use(error_middleware_1.default);
exports.default = app;
