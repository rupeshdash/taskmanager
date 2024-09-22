import { Router } from "express";
import { createTask, getAllTasks, updateTask, updateTaskStatus } from "../Controllers/TaskController";
import authMiddleware from "../Middlewares/Authtentication";

export const taskRouter = Router();
taskRouter.use(authMiddleware);
taskRouter.post("/createtask", createTask);
taskRouter.get("/getalltasks", getAllTasks);
taskRouter.post("/updatetaskstatus", updateTaskStatus);
taskRouter.post("/updatetask",updateTask)