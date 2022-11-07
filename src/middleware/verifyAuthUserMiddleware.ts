import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAuthUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(" ")[1];

  const { type } = req.user;

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (err: any, decoded: any) => {
      if (type !== "user") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      next();
    }
  );
};
