import * as yup from "yup"
import { IUserRequest } from "../../interfaces/users"
export const userCreate : yup.SchemaOf<IUserRequest> = yup.object().shape(
    {
        email : yup.string().email().required(),
        name : yup.string().required(),
        password : yup.string().required(),
    })