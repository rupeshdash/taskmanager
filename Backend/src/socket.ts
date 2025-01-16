import { Server } from "socket.io";

export const setupSocket = (server: any) => {
  const io = new Server(server, {
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
