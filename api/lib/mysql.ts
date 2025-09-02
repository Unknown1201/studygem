import mysql from 'mysql2/promise';

if (!process.env.DB_PASS) {
    throw new Error("Missing MySQL database password environment variable (DB_PASS).");
}

// Create a connection pool
const pool = mysql.createPool({
  host: 'sql301.infinityfree.com',
  user: 'if0_38861932',
  password: process.env.DB_PASS,
  database: 'if0_38861932_sg',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Add SSL configuration if your Vercel project requires it for MySQL
  // ssl: {
  //   rejectUnauthorized: true,
  // }
});

export default pool;