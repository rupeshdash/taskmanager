import { Router } from "express";
import { createTeam, getAllTeams } from "../Controllers/TeamController";
import authMiddleware from "../Middlewares/Authtentication";

export const teamRouter = Router();
// teamRouter.use(authMiddleware)
teamRouter.post("/createteam",createTeam)
teamRouter.post("/getallteams", getAllTeams);