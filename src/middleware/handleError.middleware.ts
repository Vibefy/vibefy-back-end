import { AppError } from "../error/appError";
import { Request, Response, NextFunction } from "express";

const handleErrorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  return res.status(500).json({
    message: "Internal server errror",
  });
};

export default handleErrorMiddleware;
