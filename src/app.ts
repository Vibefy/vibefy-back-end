import "express-async-errors";
import { appRoutes } from "./routes";
import express, { Request, Response } from "express";

import swaggerDocs from "./swagger.json";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());

appRoutes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (req: Request, res: Response) => {
  return res.json({
    message: "Service terms",
  });
});

export default app;
