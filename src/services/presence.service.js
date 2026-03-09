const onlineUsers = new Map()

export const addUser = (userId, socketId) => {
  onlineUsers.set(userId, socketId)
}

export const removeUser = (userId) => {
  onlineUsers.delete(userId)
}

export const getOnlineUsers = () => {
  return Array.from(onlineUsers.keys())
}