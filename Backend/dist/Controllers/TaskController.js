"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTaskStatus = exports.updateTask = exports.getAllTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../Models/Task"));
const Team_1 = __importDefault(require("../Models/Team"));
const User_1 = __importDefault(require("../Models/User"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { createdBy, title, description, members, createdAt, deadline, priority, team, status, } = req.body;
    try {
        //check if admin of task exist or not
        const taskAdmin = yield User_1.default.findOne({ _id: createdBy }).select("-password -teamsMember -teamsAdmin -tasks");
        if (!taskAdmin) {
            return res.status(401).json({
                message: "Unauthorized task creation",
            });
        }
        console.log("admin exist");
        const memberIds = members.map((member) => { var _a; return (_a = member === null || member === void 0 ? void 0 : member._id) === null || _a === void 0 ? void 0 : _a.toString(); });
        console.log("memberIds", memberIds);
        const memberUserList = yield User_1.default.find({
            _id: { $in: memberIds },
        }).select("-password -teamsMember -teamsAdmin");
        const adminTeam = yield Team_1.default.findOne({ _id: team });
        if (!adminTeam) {
            return res.status(401).json({
                message: "Unauthorized task creation",
            });
        }
        const teamMembers = (_a = adminTeam === null || adminTeam === void 0 ? void 0 : adminTeam.members) === null || _a === void 0 ? void 0 : _a.map((member) => member._id.toString());
        console.log("teamMembers", teamMembers);
        console.log("memberUserList", memberUserList);
        const nonTeamMembers = memberUserList.filter((user) => {
            console.log("user", user._id.toString());
            return !teamMembers.includes(user._id.toString());
        });
        console.log("nonTeamMembers", nonTeamMembers);
        if (nonTeamMembers.length > 0) {
            return res.status(401).json({
                message: "Unauthorized task creation",
                nonTeamMembers: nonTeamMembers,
            });
        }
        const newTask = yield Task_1.default.create({
            createdBy: taskAdmin,
            title: title,
            description: description,
            members: memberUserList,
            createdAt: createdAt,
            deadline: deadline,
            priority: priority,
            team: adminTeam,
            status: status,
        });
        // Update each member's task array with the new task's ID
        yield User_1.default.updateMany({ _id: { $in: memberIds } }, // Find members by their IDs
        { $push: { tasks: newTask } } // Push the new task ID into their tasks array
        );
        yield Team_1.default.updateOne({ _id: adminTeam._id }, { $push: { allTasks: newTask } });
        return res.status(200).json({
            message: "Task created successfully",
            task: newTask,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.createTask = createTask;
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.header("userId");
    const requiredUser = yield User_1.default.findOne({ _id: userId }).populate({
        path: "tasks",
        populate: {
            path: "members",
            select: "-password -teamsMember -teamsAdmin -tasks",
        },
    });
    if (!requiredUser) {
        return res.status(500).json({
            message: "User not found",
        });
    }
    return res.status(200).json({
        allTasks: requiredUser === null || requiredUser === void 0 ? void 0 : requiredUser.tasks,
    });
});
exports.getAllTasks = getAllTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, title, description, members, deadline, priority, status } = req.body;
    const task = yield Task_1.default.findOne({ _id: _id });
    if (!task) {
        return res.status(500).json({
            message: "Task not found",
        });
    }
    // Store the current members for comparison
    const currentMembers = task.members.map((member) => member.toString());
    task.title = title;
    task.description = description;
    task.members = members;
    task.deadline = deadline;
    task.priority = priority;
    task.status = status;
    yield task.save();
    // Update task references in user documents
    // Remove task from users who are no longer members
    yield User_1.default.updateMany({ _id: { $in: currentMembers }, tasks: _id }, { $pull: { tasks: _id } });
    // Add task to the new members' task lists
    yield User_1.default.updateMany({ _id: { $in: members }, tasks: { $ne: _id } }, { $push: { tasks: _id } });
    return res.status(200).json({
        message: "Task updated successfully",
        task: task,
    });
});
exports.updateTask = updateTask;
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Update has started");
    const { taskId, status } = req.body;
    const task = yield Task_1.default.findOne({ _id: taskId });
    if (!task) {
        return res.status(500).json({
            message: "Task not found",
        });
    }
    task.status = status;
    task.save();
    return res.status(200).json({
        status: 200,
        message: "Task updated successfully",
        task: task,
    });
});
exports.updateTaskStatus = updateTaskStatus;
const deleteTask = () => { };
exports.deleteTask = deleteTask;
