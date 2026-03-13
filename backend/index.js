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

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});