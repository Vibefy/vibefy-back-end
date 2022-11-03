
import express, { Request, Response } from "express";
import { sessionRoute } from "./routes/session.route";
import { userRoute } from "./routes/user.route";
import aswRouter from "./routes/aws.Routes"
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();

app.use("/user", userRoute);
app.use("/login", sessionRoute);
app.use("/file", aswRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (req: Request, res: Response) => {
  return res.json({
    message: "Termos de Serviço",
  });
});


export default app;
