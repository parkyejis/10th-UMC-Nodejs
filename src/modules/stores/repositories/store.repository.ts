import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const getLocalByName = async (localName: string): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(  // pool → conn
      `SELECT * FROM \`local\` WHERE local_name = ? LIMIT 1;`,
      [localName]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const createLocal = async (localName: string): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query<ResultSetHeader>(  // pool → conn
      `INSERT INTO \`local\` (local_name) VALUES (?);`,
      [localName]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getLocalById = async (localId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(  // pool → conn
      `SELECT * FROM \`local\` WHERE local_id = ?;`,
      [localId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const addStore = async (data: {
  name: string;
  category: string;
  startTime: string;
  endTime: string;
  localId: number;
}): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query<ResultSetHeader>(  // pool → conn
      `INSERT INTO store (name, category, start_time, end_time, rating, local_id)
       VALUES (?, ?, ?, ?, 0.0, ?);`,
      [data.name, data.category, data.startTime, data.endTime, data.localId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getStore = async (storeId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(  // pool → conn
      `SELECT * FROM store WHERE store_id = ?;`,
      [storeId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};