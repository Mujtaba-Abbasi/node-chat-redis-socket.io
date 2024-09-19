import { Socket } from "socket.io-client";

export interface ISocketInterface {
  sendMessage: (message: string) => void;
  socket: Socket | undefined;
  messages: any;
}
