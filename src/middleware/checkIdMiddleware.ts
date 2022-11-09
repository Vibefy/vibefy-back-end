import {Request,Response,NextFunction} from "express"
import validate from "uuid-validate"
import { AppError } from "../error/appError"
export const checkIdMiddleware = (req : Request,res: Response,next : NextFunction)=>
{
    const id = req.params.id
    const validateID = validate(id,4)
    if(!validateID)
    {
        throw new AppError(400,"id is not valid")
    }
    next()
}