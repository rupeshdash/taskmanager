"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    id: {
        type: String,
    },
    createdBy: {
        type: Object,
        requied: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    members: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    createdAt: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    team: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});
const Task = (0, mongoose_1.model)("Task", taskSchema);
exports.default = Task;
