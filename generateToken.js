import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const token = jwt.sign(
  { id: 4, role: "USER" },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: "1h" }
)

console.log(token)