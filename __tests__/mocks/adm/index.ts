export const adm = 
{
    name : "JohnDoeAdm",
    email : "JohnDoeAdm@gmail.com",
    password : "adm123",
    admHash : process.env.ADM_HASH
}
export const admWithout = 
{
    name : "JohnDoeAdm",
    email : "JohnDoeAdmWithout@gmail.com",
    admHash : process.env.ADM_HASH
}
export const admHashInvalid = 
{
    name : "JohnDoeAdm",
    email : "JohnDoeAdmHashInvalid@gmail.com",
    password : "adm123",
    admHash : "################################"
}
export const admUpdated = 
{
    name : "JohnDoeAdmUpdated",
    email : "JohnDoeAdmUpdated@gmail.com",
    password : "adm12345"
}
