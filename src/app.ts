import "express-async-errors";
import express, { Request, Response } from "express";
import sessionRoute from "./routes/session.routes";
import userRoute from "./routes/user.routes";
import aswRouter from "./routes/aws.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import admRoutes from "./routes/adm.routes"
import handleErrorMiddleware from "./middleware/error.middleware";
import { mailRoute } from "./routes/mail.routes"
import { artistRouter } from "./routes/artist.routes";

const app = express();
app.use(express.json())
app.use("/adm", admRoutes)
app.use("/user", userRoute);
app.use("/artist", artistRouter)
app.use("/login", sessionRoute);
app.use("/file", aswRouter);
app.use("/send-email", mailRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (req: Request, res: Response) => {
  return res.json({
    message: "Termos de Serviço",
  });
});
app.use(handleErrorMiddleware);

export default app;
