import { Router } from "express";

const userRoute = Router()

userRoute.post("")
userRoute.post("/profile/img")
userRoute.get("/profile")
userRoute.patch("/profile")
userRoute.delete("/profile")

export {userRoute}