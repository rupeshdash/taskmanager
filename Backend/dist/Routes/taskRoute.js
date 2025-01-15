"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const TaskController_1 = require("../Controllers/TaskController");
const Authtentication_1 = __importDefault(require("../Middlewares/Authtentication"));
exports.taskRouter = (0, express_1.Router)();
exports.taskRouter.use(Authtentication_1.default);
exports.taskRouter.post("/createtask", TaskController_1.createTask);
exports.taskRouter.get("/getalltasks", TaskController_1.getAllTasks);
exports.taskRouter.post("/updatetaskstatus", TaskController_1.updateTaskStatus);
exports.taskRouter.post("/updatetask", TaskController_1.updateTask);
