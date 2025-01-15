"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const userRoutes_1 = require("./Routes/userRoutes");
const taskRoute_1 = require("./Routes/taskRoute");
const teamRoute_1 = require("./Routes/teamRoute");
const cors = require("cors");
exports.app = (0, express_1.default)();
(0, db_1.dbconnect)();
exports.app.use(express_1.default.json());
exports.app.use(cors()); // Enable CORS for all routes
exports.app.use("/api/user", userRoutes_1.userRouter);
exports.app.use("/api/v1/task", taskRoute_1.taskRouter);
exports.app.use("/api/v1/team", teamRoute_1.teamRouter);
