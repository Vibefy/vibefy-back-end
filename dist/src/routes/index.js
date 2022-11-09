"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const adm_routes_1 = require("./adm.routes");
const user_routes_1 = require("./user.routes");
const mail_routes_1 = require("./mail.routes");
const artist_routes_1 = require("./artist.routes");
const session_routes_1 = require("./session.routes");
const playlist_routes_1 = require("./playlist.routes");
const swagger_json_1 = __importDefault(require("../swagger.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const handleError_middleware_1 = __importDefault(require("../middleware/handleError.middleware"));
const appRoutes = (app) => {
    app.use("/adm", (0, adm_routes_1.admRoutes)());
    app.use("/user", (0, user_routes_1.userRoutes)());
    app.use("/artist", (0, artist_routes_1.artistRoutes)());
    app.use("/login", (0, session_routes_1.sessionRoutes)());
    app.use("/send-email", (0, mail_routes_1.mailRoutes)());
    app.use("/playlist", (0, playlist_routes_1.playlistRoutes)());
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    app.get("/terms", (req, res) => {
        return res.json({
            message: "Service terms",
        });
    });
    app.use(handleError_middleware_1.default);
};
exports.appRoutes = appRoutes;
