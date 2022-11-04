import { Response, Request } from "express";
import { AppError, handleError } from "../../error/appError";
import { userUpdateService } from "../../services/userService/userUpdate.service"

export const userUpdateController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { id } = req.user;

  try {
    const user = await userUpdateService({
      id,
      name,
      email,
      password,
    })
    return res.status(200).json({ message: "update user" });
  }  catch(error) {
    if( error instanceof AppError){
      
      return handleError(error, res)
    }
    console.log(error)
    return res.status(500).json({message: "error internal"});
  }
};
