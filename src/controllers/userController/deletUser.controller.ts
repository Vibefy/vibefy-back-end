import { Response, Request } from "express";
import { AppError, handleError } from "../../error/appError";
import { deleteUserService } from "../../services/userService/deleteUser.service";

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const user = await deleteUserService(id);
    return res.status(204).json({ menssage: "usuario desativado" });
  }  catch(error) {
    if( error instanceof AppError){
      return handleError(error, res)
    }
    console.log(error)
    return res.status(500).json({message: "error internal"});
  }
};
