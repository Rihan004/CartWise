// src/config/db.js
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

(async () => {
  try {
    await sql`SELECT 1`;
    console.log("✅ Connected to Neon PostgreSQL");
  } catch (err) {
    console.error("❌ Neon DB connection error:", err);
  }
})();

module.exports = sql;
