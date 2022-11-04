import { Response, Request } from "express";
import { AppError, handleError } from "../../error/appError";
import { sessionService } from "../../services/login/session.service"

export const sessionController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await sessionService({ email, password });
    return res.status(200).json(token);
  } catch(error) {
    if( error instanceof AppError){
      
      return handleError(error, res)
    }
    console.log(error)
    return res.status(500).json({message: "error internal"});
  }
};
