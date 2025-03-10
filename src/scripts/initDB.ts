import { executeQuery } from "../config/db.js";

export const initDB = async () => {
  await executeQuery(`
    CREATE DATABASE IF NOT EXISTS \`database-kata\`;
  `);

  await executeQuery(`
    CREATE TABLE IF NOT EXISTS \`database-kata\`.movies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      gender VARCHAR(100) NOT NULL,
      duration INT NOT NULL,
      classification VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await executeQuery(`
    CREATE TABLE IF NOT EXISTS \`database-kata\`.rooms (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      capacity INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await executeQuery(`
    CREATE TABLE IF NOT EXISTS \`database-kata\`.reservations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      movie_id INT NOT NULL,
      room_id INT NOT NULL,
      show_time DATETIME NOT NULL,
      seats TEXT NOT NULL,
      email VARCHAR(100) NOT NULL,
      customer_name VARCHAR(50) NOT NULL,
      doc_number VARCHAR(12) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (movie_id) REFERENCES \`database-kata\`.movies(id),
      FOREIGN KEY (room_id) REFERENCES \`database-kata\`.rooms(id)
    )
  `);
};
