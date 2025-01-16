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
const socket_io_1 = require("socket.io");
const Message_1 = __importDefault(require("./Models/Message"));
const setupSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    const userSocketMap = new Map();
    const disconnect = (socket) => {
        console.log("client disconnected", socket.id);
        for (const [userId, socketId] of userSocketMap) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };
    const sendMessage = (messageData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("insidemessage", messageData);
        const { sender, recipient, message } = messageData;
        const senderSocketId = userSocketMap.get(sender);
        const recipientSocketId = userSocketMap.get(recipient);
        const createdMessage = yield Message_1.default.create(messageData);
        const messageDataFromDB = yield Message_1.default.findOne({
            _id: createdMessage._id,
        }).populate("sender", "-password -teamsMember -teamsAdmin -tasks")
            .populate("recipient", "-password -teamsMember -teamsAdmin -tasks");
        //check if recipient is online
        if (recipientSocketId) {
            // Send message to the recipient
            io.to(recipientSocketId).emit("receiveMessage", messageDataFromDB);
        }
        // Send message to the sender
        if (senderSocketId) {
            io.to(senderSocketId).emit("receiveMessage", messageDataFromDB);
        }
    });
    io.on("connection", (socket) => {
        // console.log("socket connected", socket.id);
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log("a user connected with ", userId, "with socket ID", socket.id);
        }
        else {
            console.log("no user found during socket connection");
        }
        // Handle chat message event
        socket.on("sendMessage", (messageData) => sendMessage(messageData));
        socket.on("disconnect", () => disconnect(socket));
    });
    return io;
};
exports.default = setupSocket;
