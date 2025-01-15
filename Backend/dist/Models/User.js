"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    avatar: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    teamsMember: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Team",
        },
    ],
    teamsAdmin: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Team",
        },
    ],
    tasks: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
