import { Router } from "express";
import { createTeam, getAllTeams, getAllUsers, getTeamDetails } from "../Controllers/TeamController";
import authMiddleware from "../Middlewares/Authtentication";

export const teamRouter = Router();
teamRouter.use(authMiddleware)
teamRouter.post("/createteam",createTeam)
teamRouter.post("/getallteams", getAllTeams);
teamRouter.post("/getallusers", getAllUsers);
teamRouter.get("/getteamdetails", getTeamDetails)