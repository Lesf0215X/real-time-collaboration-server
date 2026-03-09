import { createClient } from "redis"

export const pubClient = createClient({
  url: "redis://redis:6379"
})

export const subClient = pubClient.duplicate()

export const connectRedis = async () => {

  await pubClient.connect()
  await subClient.connect()

  console.log("Redis connected")

}