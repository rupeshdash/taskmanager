"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRouter = void 0;
const express_1 = require("express");
const TeamController_1 = require("../Controllers/TeamController");
const Authtentication_1 = __importDefault(require("../Middlewares/Authtentication"));
exports.teamRouter = (0, express_1.Router)();
exports.teamRouter.use(Authtentication_1.default);
exports.teamRouter.post("/createteam", TeamController_1.createTeam);
exports.teamRouter.post("/getallteams", TeamController_1.getAllTeams);
exports.teamRouter.post("/getallusers", TeamController_1.getAllUsers);
exports.teamRouter.get("/getteamdetails", TeamController_1.getTeamDetails);
