import { Response, Request } from "express";
import { AppError, handleError } from "../../error/appError";
import { getUsersService } from "../../services/userService/getUsers.service";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const user = await getUsersService(id);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(error, res);
    }
    console.log(error);
    return res.status(500).json({ message: "error internal" });
  }
};
