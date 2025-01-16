import { Router } from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  updateTaskStatus,
} from "../Controllers/TaskController";
import authMiddleware from "../Middlewares/Authtentication";
import { getAllChatUsers, getMessages, sendMessage } from "../Controllers/MessageController";

export const messageRouter = Router();
messageRouter.use(authMiddleware);
messageRouter.post("/sendmessage", sendMessage);
messageRouter.post("/getmessages", getMessages);
// messageRouter.post("/createGroupChat", createGroupChat);
messageRouter.post("/getallchatusers",getAllChatUsers);
