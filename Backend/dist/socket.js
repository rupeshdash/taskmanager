"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const socket_io_1 = require("socket.io");
const setupSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*", // Adjust this to your frontend's domain if needed
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        console.log("A user connected with socket ID:", socket.id);
        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
        });
    });
    return server; // Return the server to use for listening
};
exports.setupSocket = setupSocket;
