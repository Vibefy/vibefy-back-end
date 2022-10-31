import { Request } from "express"
import { IPayment } from "./payment.interface"

export interface IUser
{
    id? : string
    name : string
    email : string
    logo : string
    password : string
    isActive : boolean
    admHash? : string
    payment? : IPayment
}
export interface IUserRequest extends Request
{
    validatedBody : IUser
}