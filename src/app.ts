import express from "express";
import { array } from "yup";
import { sessionRoute } from "./routes/session.route";
import { userRoute } from "./routes/user.route";

const app = express()

app.use("/user",userRoute)
app.use("/login",sessionRoute)

export default app