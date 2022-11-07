import { IArtist } from "../artist";
import { IUser } from "../user";

export interface IAdm
{
    id : string;
    name : string;
    email : string;
    avatar_img : string;
}
export interface IAllUsers
{
    Users : IUser[]
    Artist : IArtist[]
}