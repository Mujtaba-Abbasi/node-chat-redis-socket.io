import { useContext } from "react";
import { SocketContext, ISocketInterface } from "../../providers";

export const useSocket = (): ISocketInterface => {
  const { sendMessage, socket, messages } = useContext(SocketContext);

  return { sendMessage, socket, messages };
};
