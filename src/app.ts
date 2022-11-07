import "express-async-errors";
import express, { Request, Response } from "express";

import swaggerDocs from "./swagger.json";
import swaggerUi from "swagger-ui-express";

import aswRouter from "./routes/aws.routes";
import admRoutes from "./routes/adm.routes";
import userRoute from "./routes/user.routes";
import { mailRoute } from "./routes/mail.routes";
import sessionRoute from "./routes/session.routes";
import { artistRouter } from "./routes/artist.routes";
import { playlistRoute } from "./routes/playlist.routes";

import handleErrorMiddleware from "./middleware/handleError.middleware";

const app = express();

app.use(express.json());
app.use("/adm", admRoutes);
app.use("/user", userRoute);
app.use("/artist", artistRouter);
app.use("/login", sessionRoute);
app.use("/file", aswRouter);
app.use("/send-email", mailRoute);
app.use("/playlist", playlistRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (req: Request, res: Response) => {
  return res.json({
    message: "Termos de Serviço",
  });
});
app.use(handleErrorMiddleware);

export default app;
