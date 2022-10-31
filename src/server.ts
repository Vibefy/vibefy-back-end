import app from "./app"
import prismaClient from "./prisma"

async function initialize()
{
    app.listen(3000,()=>
    {
        console.log("Executing application!")
    })
    await prismaClient.$connect().then((connection)=>
    {
        console.log("Prisma connection success!")
    }).catch((errConnection)=>
    {
        console.log(errConnection)
    })
}
initialize()