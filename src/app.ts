import express from "express";
import { array } from "yup";
import { s3Client,upload } from "./aws";
import { sessionRoute } from "./routes/session.route";
import { userRoute } from "./routes/user.route";

const app = express()

app.use("/user",userRoute)
app.use("/login",sessionRoute)
app.post("/musics",upload.fields([{name : "music",maxCount : 1},{name : "image", maxCount : 1}]),(req,res,next)=>
{
    return res.status(201).json({"message" : "image and music created"})
})

export default app