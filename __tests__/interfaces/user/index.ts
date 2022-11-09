export interface IUser
{
    id : string
    name : string
    email : string
    password : string
    avatar_img : string;
    playlist : []
    isActive : boolean;
    created_At : Date;
    updated_At : Date;
}