import express from "express";

const app = express()

app.listen(3000,()=>
{
    console.log("Executing application!")
})

export default app