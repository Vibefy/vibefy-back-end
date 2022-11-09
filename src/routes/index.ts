import { admRoutes } from "./adm.routes";
import { userRoutes } from "./user.routes";
import { mailRoutes } from "./mail.routes";
import { artistRoutes } from "./artist.routes";
import { sessionRoutes } from "./session.routes";
import { playlistRoutes } from "./playlist.routes";

import { Express } from "express";
import swaggerDocs from "../swagger.json";
import swaggerUi from "swagger-ui-express";
import { Request, Response } from "express";

import handleErrorMiddleware from "../middleware/handleError.middleware";

export const appRoutes = (app: Express) => {
  app.use("/adm", admRoutes());
  app.use("/user", userRoutes());
  app.use("/artist", artistRoutes());
  app.use("/login", sessionRoutes());
  app.use("/send-email", mailRoutes());
  app.use("/playlist", playlistRoutes());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.get("/terms", (req: Request, res: Response) => {
    return res.json({
      message: "Service terms",
    });
  });
  app.use(handleErrorMiddleware);
};
