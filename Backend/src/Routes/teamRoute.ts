import { Router } from "express";
import { createTeam, getAllTeams } from "../Controllers/TeamController";

export const teamRouter = Router();
teamRouter.post("/createteam",createTeam)
teamRouter.post("/getallteams", getAllTeams);