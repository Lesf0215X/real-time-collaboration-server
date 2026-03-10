const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const { socketHandler } = require("./sockets/socketHandler");
const { socketAuth } = require("./middlewares/auth.middleware");
const { connectRedis, pubClient, subClient } = require("./config/redis");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    const httpServer = http.createServer(app);

    const io = new Server(httpServer, { cors: { origin: "*" } });

    // Redis adapter
    await connectRedis();
    const { createAdapter } = require("@socket.io/redis-adapter");
    io.adapter(createAdapter(pubClient, subClient));

    io.use(socketAuth);

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);
      socketHandler(io, socket);
    });

    httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Server error:", err);
  }
})();