import "express-async-errors";
import { appRoutes } from "./routes";
import express from "express";

const app = express();

app.use(express.json());

appRoutes(app);

export default app;
