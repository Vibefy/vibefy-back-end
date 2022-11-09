import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyAuthArtistMiddleware = (
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
      if (type !== "artist") {
        return res.status(401).json({ message: "User is not an artist" });
      }

      next();
    }
  );
};
