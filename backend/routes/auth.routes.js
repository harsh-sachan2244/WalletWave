import express from "express"
import { login, logout, signUp, getCurrentUser, updateProfile } from "../controllers/auth.controller.js"
import isAuth from "../middleware/auth.middleware.js"

const authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.get("/me", isAuth, getCurrentUser);
authRouter.put("/profile/update", isAuth, updateProfile);

export default authRouter