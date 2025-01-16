"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = require("express");
const Authtentication_1 = __importDefault(require("../Middlewares/Authtentication"));
const MessageController_1 = require("../Controllers/MessageController");
exports.messageRouter = (0, express_1.Router)();
exports.messageRouter.use(Authtentication_1.default);
exports.messageRouter.post("/sendmessage", MessageController_1.sendMessage);
exports.messageRouter.post("/getmessages", MessageController_1.getMessages);
// messageRouter.post("/createGroupChat", createGroupChat);
exports.messageRouter.post("/getallchatusers", MessageController_1.getAllChatUsers);
