import mysql2 from "mysql2/promise";

export const pool = mysql2.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12801510",
  password: "vKx7DmxQG6",
  database: " sql12801510",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("Error", error);
  }
};
