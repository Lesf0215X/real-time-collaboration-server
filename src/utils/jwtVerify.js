import jwt from "jsonwebtoken"

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    return decoded
  } catch (error) {
    console.log("JWT error:", error.message)
    return null
  }
}