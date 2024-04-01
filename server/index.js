import dotenv from "dotenv";

import app from "../server/app.js";
import { firebaseServerApp } from "./config/firebaseConfig.js";

dotenv.config();
const PORT = process.env.PORT || 3001;

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);

//init firebaseServerApp
firebaseServerApp();

const server = app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

export const io = new Server(server, {
  // pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("🚀 Someone connected!");

  socket.on("newOrder", (order) => {
    console.log("🚀 New Order!");
    console.log(order);
    setTimeout(() => {
      console.log("🚀 Order Received!");
      io.emit("receiveOrder", "sah");
    }, 1000);
  });

  socket.on("join", ({ userId }) => {
    console.log("🚀 User joined!");
    console.log(userId);
  });

  socket.on("disconnect", () => {
    console.log("⚠️ Someone disconnected");

    // io.emit("getUsers", users);
    // console.log(users);
  });
});
