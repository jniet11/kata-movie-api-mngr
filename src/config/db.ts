import mysql, {
  ResultSetHeader,
  RowDataPacket,
  FieldPacket,
} from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const sslOptions = {
  ca: fs.readFileSync("us-east-2-bundle.pem"),
  rejectUnauthorized: false,
};

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "database-kata",
  waitForConnections: true,
  connectionLimit: 10,
  ssl: sslOptions,
  typeCast: (field, next) => {
    if (field.type === "TINY" && field.length === 1) {
      return field.string() === "1";
    }
    return next();
  },
});

export interface QueryResult {
  results: RowDataPacket[] | ResultSetHeader;
  fields?: FieldPacket[];
}

export const executeQuery = async (
  sql: string,
  values?: any[]
): Promise<QueryResult> => {
  const connection = await pool.getConnection();
  try {
    const [results, fields] = await connection.execute<
      RowDataPacket[] | ResultSetHeader
    >(sql, values);
    return { results, fields };
  } finally {
    connection.release();
  }
};

export default pool;
