import { Response, Request } from "express";
import { AppError, handleError } from "../../error/appError";
import { createUserService } from "../../services/userService/createUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await createUserService({ name, email, password});
    return res.status(201).json(user);
  }  catch(error) {
    if( error instanceof AppError){
      
      return handleError(error, res)
    }
    console.log(error)
    return res.status(500).json({message: "error internal"});
  }
};
