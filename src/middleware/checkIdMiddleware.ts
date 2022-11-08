import validate from "uuid-validate"
import {Request,Response,NextFunction} from "express"
import { AppError } from "../error/appError"

export const checkIdMiddleware = (req : Request,res: Response,next : NextFunction)=>
{
    const id = req.params.id
    const validateID = validate(id,4)
    if(!validateID)
    {
        throw new AppError(400,"Id is not valid")
    }
    next()
}