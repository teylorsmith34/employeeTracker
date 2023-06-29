const mysql2 = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file

// Create a new connection to the database
const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = connection;
