import * as yup from "yup"
import { IUserRequest } from "../../interfaces/users"
export const userCreate : yup.SchemaOf<IUserRequest> = yup.object().shape(
    {
        email : yup.string().email().required(),
        name : yup.string().required(),
        password : yup.string().required(),
        avatar_img : yup.string().notRequired()
    })
export const userUpdate : yup.SchemaOf<IUserRequest> = yup.object().shape(
    {
        email : yup.string().email().when(["name","password"],{is : ((name : string,password : string)=>
            {
                if(name || password)
                {
                    return true
                }
                else
                {
                    return false
                }
            }),then : ((schema)=> schema.notRequired()),otherwise : ((schema)=> schema.required())}),
        name : yup.string().when(["email","password"],{is : ((email : string,password : string)=>
            {
                if(email || password)
                {
                    return true
                }
                else
                {
                    return false
                }
            }),then : ((schema)=> schema.notRequired()),otherwise : ((schema)=> schema.required())}),
        password : yup.string().when(["email","name"],{is : ((email : string,name : string)=>
            {
                if(email || name)
                {
                    return true
                }
                else
                {
                    return false
                }
            }),then : ((schema)=> schema.notRequired()),otherwise : ((schema)=> schema.required())})
    },[["name","password"],["email","password"],["email","name"]])