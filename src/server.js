import dotenv from "dotenv"
dotenv.config()

import { createAdapter } from "@socket.io/redis-adapter"
import { pubClient, subClient, connectRedis } from "./config/redis.js"

import app from "./app.js"
import { createServer } from "http"
import { Server } from "socket.io"

import { socketHandler } from "./sockets/socketHandler.js"
import { verifyToken } from "./utils/jwtVerify.js"

const PORT = process.env.PORT || 4000

// crear servidor HTTP usando Express
const httpServer = createServer(app)

// crear servidor Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
await connectRedis()

io.adapter(createAdapter(pubClient, subClient))

// middleware de autenticación para sockets
io.use((socket, next) => {

  const token = socket.handshake.auth?.token

  if (!token) {
    return next(new Error("Authentication error"))
  }

  const user = verifyToken(token)

  if (!user) {
    return next(new Error("Invalid token"))
  }

  socket.user = user

  next()

})

// conexión de sockets
io.on("connection", (socket) => {

  console.log("Socket connected:", socket.id)
  console.log("User connected:", socket.user.id)

  socketHandler(io, socket)

})

// iniciar servidor
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})