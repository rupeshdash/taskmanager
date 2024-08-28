import { Router } from "express";
import { createTeam, getAllTeams, getAllUsers } from "../Controllers/TeamController";
import authMiddleware from "../Middlewares/Authtentication";

export const teamRouter = Router();
teamRouter.use(authMiddleware)
teamRouter.post("/createteam",createTeam)
teamRouter.post("/getallteams", getAllTeams);
teamRouter.post("/getallusers", getAllUsers);