"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../Controllers/UserController");
const Multer_1 = require("../Middlewares/Multer");
const Authtentication_1 = __importDefault(require("../Middlewares/Authtentication"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/signup", Multer_1.upload.fields([{ name: "avatar", maxCount: 1 }]), UserController_1.signup);
exports.userRouter.post("/login", UserController_1.login);
exports.userRouter.get("/getuserdetails", Authtentication_1.default, UserController_1.getUserDetails);
