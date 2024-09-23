import { Router } from "express";
import { getUserDetails, login, signup } from "../Controllers/UserController";
import { upload } from "../Middlewares/Multer";
import authMiddleware from "../Middlewares/Authtentication";

export const userRouter = Router();

userRouter.post(
  "/signup",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  signup
);
userRouter.post("/login", login);
userRouter.get("/getuserdetails", authMiddleware, getUserDetails);
