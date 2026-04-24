// Import required libraries
const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');

// Create the connection using the environment variables injected by Docker
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Attempt to connect
connection.connect((err) => {
  if (err) {
    console.error('❌ Fatal Error: Could not connect to MySQL.', err);
    return;
  }
  console.log('✅ Successful connection to the MySQL database!');

  // Create the table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      tech_stack VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('❌ Error creating table:', err);
      return;
    }
    console.log('✅ "projects" table is ready!');

    // Insert a sample project if the table is empty
    connection.query('SELECT COUNT(*) AS count FROM projects', (err, results) => {
      if (err) {
        console.error('❌ Error checking table rows:', err);
        return;
      }
      
      if (results.count === 0) {
        const seedQuery = 'INSERT INTO projects (title, description, tech_stack) VALUES (?, ?, ?)';
        connection.query(seedQuery, ['My Docker Portfolio', 'A full-stack app running on containers', 'React, Node, MySQL'], (err) => {
          if (!err) console.log('🌱 Database seeded with initial data!');
        });
      }
    });
  });
});

// Initialize the Express application
const app = express();
const PORT = 3000;

// Middleware: Enable CORS
// As a frontend dev, you know how painful CORS errors are.
// This line tells the server to accept requests from other origins/ports.
app.use(cors());

// Middleware: Parse incoming JSON payloads
app.use(express.json());

// Our first endpoint (API Route)
// When someone makes a GET request to http://localhost:3000/api/status, return this:
app.get("/api/status", (req, res) => {
  res.json({
    message: "Hello world! Successful request from Node.js 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Get all projects from the database
app.get("/api/projects", (req, res) => {
  connection.query('SELECT * FROM projects', (err, results) => {
    if (err) {
      console.error('❌ Error fetching projects:', err);
      res.status(500).json({ error: 'Error fetching projects' });
      return;
    }
    res.json(results);
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});