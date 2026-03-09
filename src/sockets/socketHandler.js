import { saveMessage, getRoomMessages } from "../services/message.service.js"
import { addUser, removeUser, getOnlineUsers } from "../services/presence.service.js"

export const socketHandler = (io, socket) => {

  addUser(socket.user.id, socket.id)

  io.emit("online_users", getOnlineUsers())

  console.log("User connected:", socket.user.id)

  // unirse a una room
socket.on("join_room", async (room) => {

  socket.join(room)

  console.log(`User ${socket.user.id} joined room ${room}`)

  const messages = await getRoomMessages(room)

  socket.emit("room_history", messages)

  io.to(room).emit("user_joined", {
    userId: socket.user.id,
    room
  })

})

  // salir de una room
socket.on("leave_room", (room) => {

  io.to(room).emit("user_left", {
    userId: socket.user.id,
    room: room
  })

  socket.leave(room)

  console.log(`User ${socket.user.id} left room ${room}`)

})

  // enviar mensaje
socket.on("send_message", async (data) => {

  const { room, message } = data

  const savedMessage = await saveMessage(
    socket.user.id,
    room,
    message
  )

  io.to(room).emit("receive_message", savedMessage)

})

socket.on("typing", (room) => {

  socket.to(room).emit("user_typing", {
    userId: socket.user.id
  })

})

socket.on("send_notification", (data) => {

  const { userId, message } = data

  io.emit("notification", {
    userId,
    message,
    timestamp: new Date()
  })

})



socket.on("disconnect", () => {

  removeUser(socket.user.id)

  io.emit("online_users", getOnlineUsers())

  console.log("User disconnected:", socket.user.id)

})





}