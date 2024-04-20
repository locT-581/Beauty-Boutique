import dotenv from "dotenv";

import app from "../server/app.js";
import { firebaseServerApp } from "./config/firebaseConfig.js";

import schedule from "node-schedule";

dotenv.config();
const PORT = process.env.PORT || 3001;

import { createServer } from "http";
import { Server } from "socket.io";
import { getFirestore } from "firebase-admin/firestore";

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

const db = getFirestore();
schedule.scheduleJob("* * * * *", async () => {
  try {
    console.log("🚀 Checking and updating orders...");

    // Get all orders from firestore
    db.collection("orders")
      .get()
      .then((orders) => {
        // Loop through all orders and check if any order is expired then update userConfirm to true
        orders.forEach(async (order) => {
          const orderData = order.data();
          const orderTime = orderData.timestamp;
          const currentTime = new Date().getTime();
          const diff = currentTime - orderTime;

          if (diff > 1000 * 60 * 5 && !orderData.userConfirm) {
            console.log("🚀 Order expired!");
            await db
              .collection("orders")
              .doc(order.id)
              .update({
                userConfirm: true,
              })
              .then(() => {
                const historyRef = db
                  .collection("users")
                  .doc(userId)
                  .collection("orders-history");
                historyRef
                  .doc(productId)
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      historyRef.doc(productId).update({
                        userConfirm: true,
                      });
                    }
                  });
              });
          }
        });
      });
  } catch (error) {
    console.error("Error checking and updating orders:", error);
  }
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
