import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { env } from "../config/env";

let io: SocketIOServer | null = null;

export const initSocketServer = (httpServer: HttpServer) => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("joinOrderRoom", (orderId: string) => {
      socket.join(`order_${orderId}`);
      console.log(`Socket ${socket.id} joined room order_${orderId}`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
