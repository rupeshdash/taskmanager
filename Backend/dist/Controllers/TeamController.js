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
exports.getTeamDetails = exports.getAllUsers = exports.getAllTeams = exports.createTeam = void 0;
const Team_1 = __importDefault(require("../Models/Team"));
const User_1 = __importDefault(require("../Models/User"));
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { _id, admin, members, createdAt, description, title } = req.body;
    try {
        const adminUser = yield User_1.default.findOne({ email: admin }).select("-password");
        if (!adminUser) {
            return res.status(500).json({
                message: "Admin not found",
            });
        }
        const memberUserList = yield User_1.default.find({
            _id: members.map((member) => {
                return member._id;
            }),
        }).select("-password");
        const existingTeam = yield Team_1.default.findOne({ _id: _id });
        if (existingTeam) {
            existingTeam.members = memberUserList;
            existingTeam.description = description;
            existingTeam.title = title;
            existingTeam.save();
            return res.status(200).json({
                message: "Team details updated successfully",
                team: existingTeam,
            });
        }
        else {
            const newTeam = yield Team_1.default.create({
                admin: adminUser,
                members: memberUserList,
                description: description,
                createdAt: createdAt,
                title: title,
            });
            (_a = adminUser === null || adminUser === void 0 ? void 0 : adminUser.teamsAdmin) === null || _a === void 0 ? void 0 : _a.push(newTeam.id);
            memberUserList === null || memberUserList === void 0 ? void 0 : memberUserList.map((member) => {
                member.teamsMember.push(newTeam.id);
                member.save();
            });
            if (adminUser)
                adminUser.save();
            return res.status(200).json({
                message: "Team created successfully",
                team: newTeam,
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createTeam = createTeam;
const getAllTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminEmail } = req.body;
        const adminUser = yield User_1.default.findOne({ email: adminEmail }).select("-password");
        const adminTeams = yield Team_1.default.find({ admin: adminUser === null || adminUser === void 0 ? void 0 : adminUser._id })
            .populate("admin", "-password -teamsMember -teamsAdmin -tasks")
            .populate("members", "-password -teamsMember -teamsAdmin -tasks")
            .lean();
        // Find teams where the user is a member
        const memberTeams = yield Team_1.default.find({ members: adminUser === null || adminUser === void 0 ? void 0 : adminUser._id })
            .populate("admin", "-password -teamsMember -teamsAdmin -tasks")
            .populate("members", "-password -teamsMember -teamsAdmin -tasks")
            .lean();
        // Combine the results and remove duplicates
        const allTeams = [...adminTeams, ...memberTeams];
        const uniqueTeams = allTeams.filter((team, index, self) => index ===
            self.findIndex((t) => t._id.toString() === team._id.toString()));
        return res.status(200).json({ teams: uniqueTeams });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.getAllTeams = getAllTeams;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { organization } = req.body;
        const orgUsers = yield User_1.default.find({ organization: organization }).select("-password -teamsMember -teamsAdmin -tasks");
        return res.status(200).json({ orgUsers: orgUsers });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.getAllUsers = getAllUsers;
const getTeamDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.query; // Fetch the organization from query params
        if (!teamId) {
            return res.status(400).json({ message: "Organization is required" });
        }
        const teamDetails = yield Team_1.default.find({ _id: teamId })
            .populate("members", "-password -teamsMember -teamsAdmin -tasks")
            .populate({
            path: "allTasks",
            populate: {
                path: "members",
                select: "-password -teamsMember -teamsAdmin -tasks",
            },
        });
        if (!teamDetails) {
            return res.status(400).json({ message: "Team not found." });
        }
        return res.status(200).json({ teamDetails: teamDetails });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.getTeamDetails = getTeamDetails;
