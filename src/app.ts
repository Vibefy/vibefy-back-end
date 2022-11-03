
import express, { NextFunction, Request, Response } from "express";
import sessionRoute  from "./routes/session.routes";
import userRoute  from "./routes/user.routes";
import aswRouter from "./routes/aws.Routes"
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import { AppError } from "./error/appError";

const app = express();
app.use(express.json())

app.use("/user", userRoute);
app.use("/login", sessionRoute);
app.use("/file", aswRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (req: Request, res: Response) => {
  return res.json({
    message: "Termos de Serviço",
  });
});
app.use((err: any, request: Request, response: Response, _: NextFunction) => {
    
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});


export default app;
