const { saveMessage, getRoomMessages } = require("../services/message.service");
const { addUser, removeUser, getOnlineUsers } = require("../services/presence.service");

const socketHandler = (io, socket) => {
  addUser(socket.user.id, socket.id);
  io.emit("online_users", getOnlineUsers());
  console.log("User connected:", socket.user.id);

  socket.on("join_room", async (room) => {
    socket.join(room);
    const messages = await getRoomMessages(room);
    socket.emit("room_history", messages);
    io.to(room).emit("user_joined", { userId: socket.user.id, room });
  });

  socket.on("leave_room", (room) => {
    socket.leave(room);
    io.to(room).emit("user_left", { userId: socket.user.id, room });
  });

  socket.on("send_message", async ({ room, message }) => {
    const savedMessage = await saveMessage(socket.user.id, room, message);
    io.to(room).emit("receive_message", savedMessage);
  });

  socket.on("typing", (room) => {
    socket.to(room).emit("user_typing", { userId: socket.user.id });
  });

  socket.on("send_notification", ({ userId, message }) => {
    io.emit("notification", { userId, message, timestamp: new Date() });
  });

  socket.on("disconnect", () => {
    removeUser(socket.user.id);
    io.emit("online_users", getOnlineUsers());
    console.log("User disconnected:", socket.user.id);
  });
};

module.exports = { socketHandler };