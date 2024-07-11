import { Router } from "express";
import { login, signup } from "../Controllers/UserController";

export const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
