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
exports.getAllChatUsers = exports.getMessages = exports.sendMessage = void 0;
const Message_1 = __importDefault(require("../Models/Message"));
const User_1 = __importDefault(require("../Models/User"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender, recipients, messageContent, messageType, mediaUrl } = req.body;
    if (!sender || !recipients || !messageContent || !messageType) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newMessage = yield Message_1.default.create({
        sender,
        recipients,
        messageContent,
        messageType,
        mediaUrl,
    });
    const populatedMessage = yield Message_1.default.findById(newMessage._id)
        .populate("sender", "-password -teamsMember -teamsAdmin -tasks")
        .populate("recipients", "-password -teamsMember -teamsAdmin -tasks");
    if (!populatedMessage) {
        return res.status(500).json({ message: "Internal server error" });
    }
    return res
        .status(200)
        .json({
        message: "Message sent successfully",
        recentMessage: populatedMessage,
    });
});
exports.sendMessage = sendMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender, recipient } = req.body;
    const messages = yield Message_1.default.find({
        $or: [{ sender: sender, recipient: recipient }, { sender: recipient, recipient: sender }],
    })
        .populate("sender", "-password -teamsMember -teamsAdmin -tasks")
        .populate("recipient", "-password -teamsMember -teamsAdmin -tasks");
    return res.status(200).json({ messages: messages });
});
exports.getMessages = getMessages;
const getAllChatUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { organization, userId } = req.body;
        const orgUsers = yield User_1.default.find({ organization: organization }).select("-password -teamsMember -teamsAdmin -tasks");
        if (!orgUsers) {
            return res.status(400).json({ message: "User not found" });
        }
        const orgUsersWithLastMessage = yield Promise.all(orgUsers.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            // Fetch the last message between the current user and the userId
            const lastMessage = yield Message_1.default.findOne({
                $or: [
                    { sender: userId, recipient: user._id },
                    { sender: user._id, recipient: userId },
                ],
            })
                .sort({ createdAt: -1 }) // Get the most recent message
                .lean(); // Use .lean() for better performance if you don't need Mongoose documents
            // Return user data with the last message
            return Object.assign(Object.assign({}, user.toObject()), { lastMessage: lastMessage || null });
        })));
        return res.status(200).json({ allChatUsers: orgUsersWithLastMessage });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.getAllChatUsers = getAllChatUsers;
