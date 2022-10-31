import { Request,Response } from "express";
import { IUser, IUserRequest } from "../interfaces/user.interface";
import { userCreateService } from "../services/user.service";
export async function userCreateController(req : IUserRequest, res : Response)
{
    const data : IUser = req.validatedBody
    const createRes = await userCreateService(data)
    return res.status(201).json(createRes)
}