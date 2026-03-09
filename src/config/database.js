import pkg from "pg"

const { Pool } = pkg

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "realtime_chat"
})

pool.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("DB connection error:", err))