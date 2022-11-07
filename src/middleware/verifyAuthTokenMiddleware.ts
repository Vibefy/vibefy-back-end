import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyAuthTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        if (!decoded) {
          throw new Error("Invalid token");
        }

        req.userEmail = decoded.email;

        req.user = { id: decoded.sub, type: decoded.type };

        next();
      }
    );
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
