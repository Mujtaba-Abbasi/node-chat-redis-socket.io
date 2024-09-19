import { createServer } from "http";
import { SocketService } from "./services/socket";
import { config } from "./config";

export function startServer() {
  const httpServer = createServer();

  const PORT = config.server.PORT || 8000;

  const io = SocketService.getio();

  io.attach(httpServer, {
    cors: {
      allowedHeaders: ["*"],
      origin: "http://localhost:3000",
    },
  });

  SocketService.initListeners();

  httpServer.listen(PORT, () => {
    console.log("Server is running on port =>", PORT);
  });
}
