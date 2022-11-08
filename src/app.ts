import "express-async-errors";
import express, { Request, Response } from "express";

import swaggerDocs from "./swagger.json";
import swaggerUi from "swagger-ui-express";

import { admRouter } from "./routes/adm.routes";
import { mailRouter } from "./routes/mail.routes";
import { userRouter } from "./routes/user.routes";
import { artistRouter } from "./routes/artist.routes";
import { sessionRouter } from "./routes/session.routes";
import { playlistRouter } from "./routes/playlist.routes";

import handleErrorMiddleware from "./middleware/handleError.middleware";

const app = express();

app.use(express.json());
app.use("/adm", admRouter);
app.use("/user", userRouter);
app.use("/artist", artistRouter);
app.use("/login", sessionRouter);
app.use("/send-email", mailRouter);
app.use("/playlist", playlistRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (req: Request, res: Response) => {
  return res.json({
    message: "Termos de Serviço",
  });
});
app.use(handleErrorMiddleware);

export default app;
