import { Server } from "socket.io";
import Redis from "ioredis";
import { handleSocketEvents } from "../events/socket";
import { createRedisClients } from "../clients/redis";

class Socket {
  private io: Server;
  private pubClient: Redis;
  private subClient: Redis;

  constructor() {
    console.log("Initializing Socket Server");
    this.io = new Server();
    const { pubClient, subClient } = createRedisClients();
    this.pubClient = pubClient;
    this.subClient = subClient;

    this.subClient.subscribe("MESSAGE");
  }

  public initListeners() {
    const _io = this.io;

    console.log("Listening to Sockets");

    _io.on("connect", (socket) => {
      handleSocketEvents(socket, this.pubClient, this.subClient);
    });
  }

  getio() {
    return this.io;
  }
}

export const SocketService = new Socket();
