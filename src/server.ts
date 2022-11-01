import app from "./app"
import dataSource from "./data-source"

async function initialize()
{
    app.listen(3000,()=>
    {
        console.log("Executing application!")
    })
    await dataSource.initialize().then((res)=>
    {
        console.log("Connected with db")
    }).catch((err)=> console.log(err))
}
initialize()