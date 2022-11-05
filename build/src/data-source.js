"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
    synchronize: false,
    logging: true,
    entities: process.env.NODE_ENV === "production"
        ? [""]
        : ["build/src/entities/*.js"],
    migrations: process.env.NODE_ENV === "production"
        ? ["build/src/migrations/*.js"]
        : ["src/migrations/*.ts"],
});
