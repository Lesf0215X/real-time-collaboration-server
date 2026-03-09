import { pool } from "../config/database.js"

export const saveMessage = async (userId, room, message) => {

  const query = `
    INSERT INTO messages (user_id, room, message)
    VALUES ($1, $2, $3)
    RETURNING *
  `

  const values = [userId, room, message]

  const result = await pool.query(query, values)

  return result.rows[0]
}

export const getRoomMessages = async (room) => {

  const query = `
    SELECT * FROM messages
    WHERE room = $1
    ORDER BY created_at ASC
  `

  const result = await pool.query(query, [room])

  return result.rows
}