import { Router } from "express";
import { createTask, getAllTasks } from "../Controllers/TaskController";
import { createTeam } from "../Controllers/TeamController";
import authMiddleware from "../Middlewares/Authtentication";

export const taskRouter = Router();
taskRouter.use(authMiddleware);
taskRouter.post("/createtask", createTask);
taskRouter.post("/getalltasks", getAllTasks);