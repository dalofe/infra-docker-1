const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        tech_stack VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ "projects" table is ready!');

    const { rows } = await pool.query('SELECT COUNT(*) AS count FROM projects');
    if (parseInt(rows[0].count) === 0) {
      await pool.query(
        'INSERT INTO projects (title, description, tech_stack) VALUES ($1, $2, $3)',
        ['My Docker Portfolio', 'A full-stack app running on containers', 'React, Node, PostgreSQL']
      );
      console.log('🌱 Database seeded with initial data!');
    }
  } catch (err) {
    console.error('❌ Fatal Error: Could not connect to PostgreSQL.', err);
  }
}

initDB();

app.get("/api/status", (req, res) => {
  res.json({
    message: "Hello world! Successful request from Node.js 🚀",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/projects", async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (err) {
    console.error('❌ Error fetching projects:', err);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
