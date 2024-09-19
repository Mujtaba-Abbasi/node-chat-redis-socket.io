import Redis from "ioredis";
import { Socket } from "socket.io";

export const handleSocketEvents = (
  socket: Socket,
  pubClient: Redis,
  subClient: Redis
) => {
  socket.on("message", async (payload) => {
    pubClient.publish("MESSAGE", JSON.stringify(payload));
  });

  subClient.on("message", (channel, message) => {
    if (channel === "MESSAGE") {
      socket.broadcast.emit("message", JSON.parse(message));
    }
  });
};
