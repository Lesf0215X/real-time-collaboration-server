const { createClient } = require("redis");

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

const connectRedis = async () => {
  try {
    await pubClient.connect();
    await subClient.connect();
    console.log("Redis connected");
  } catch (err) {
    console.error("Redis connection error:", err);
  }
};

module.exports = { pubClient, subClient, connectRedis };