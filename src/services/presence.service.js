const onlineUsers = new Map();

const addUser = (userId, socketId) => onlineUsers.set(userId, socketId);
const removeUser = (userId) => onlineUsers.delete(userId);
const getOnlineUsers = () => Array.from(onlineUsers.keys());

module.exports = { addUser, removeUser, getOnlineUsers };