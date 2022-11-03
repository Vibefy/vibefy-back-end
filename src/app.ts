import express from "express";
import { array } from "yup";
import { sessionRoute } from "./routes/session.route";
import { userRoute } from "./routes/user.route";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();

app.use("/user", userRoute);
app.use("/login", sessionRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/terms", (req: Request, res: Response) => {
  return res.json({
    message: "Termos de Serviço",
  });
});

export default app;
