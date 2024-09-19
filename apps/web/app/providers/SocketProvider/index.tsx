"use client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ISocketInterface } from "./props";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<ISocketInterface>({
  sendMessage: () => {},
  socket: undefined,
  messages: [],
});

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    setSocket(_socket);

    _socket.on("message", (message: string) => {
      console.log("The message from server =>", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      _socket?.disconnect();
      setSocket(undefined);
    };
  }, []);

  function sendMessage(message: string) {
    if (socket) {
      socket.emit("message", message);
    }
  }

  return (
    <SocketContext.Provider value={{ sendMessage, socket, messages }}>
      {children}
    </SocketContext.Provider>
  );
};

export * from "./props";
