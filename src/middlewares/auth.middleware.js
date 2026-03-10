const { verifyToken } = require("../utils/jwtVerify");

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error"));

    const user = verifyToken(token);
    if (!user) return next(new Error("Invalid token"));

    socket.user = user;
    next();
  } catch {
    next(new Error("Authentication error"));
  }
};

module.exports = { socketAuth };