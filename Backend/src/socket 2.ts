import { Server as SockerIOServer } from "socket.io";
import Message from "./Models/Message";
const setupSocket = (server: any) => {
  const io = new SockerIOServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket: any) => {
    console.log("client disconnected", socket.id);
    for (const [userId, socketId] of userSocketMap) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (messageData: any) => {
    console.log("insidemessage", messageData);
    
    const { sender, recipient, message } = messageData;
    const senderSocketId = userSocketMap.get(sender);
    const recipientSocketId = userSocketMap.get(recipient);

    const createdMessage = await Message.create(messageData);
    
    const messageDataFromDB = await Message.findOne({
      _id: createdMessage._id,
    }).populate("sender", "-password -teamsMember -teamsAdmin -tasks")
    .populate("recipient", "-password -teamsMember -teamsAdmin -tasks");

    //check if recipient is online
    if(recipientSocketId) {
      // Send message to the recipient
      io.to(recipientSocketId).emit("receiveMessage", messageDataFromDB);
    }

    // Send message to the sender
    if(senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", messageDataFromDB);
    }
  };

  io.on("connection", (socket) => {
    // console.log("socket connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(
        "a user connected with ",
        userId,
        "with socket ID",
        socket.id
      );
    } else {
      console.log("no user found during socket connection");
    }
    // Handle chat message event
    socket.on("sendMessage", (messageData) => sendMessage(messageData));
    socket.on("disconnect", () => disconnect(socket));
  });

  return io;
};

export default setupSocket;
