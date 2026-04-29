import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 가게 이름으로 가게 조회
export const getStoreByName = async (storeName: string): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM store WHERE name = ? LIMIT 1;`,
      [storeName]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 리뷰 추가
export const addReview = async (data: {
  content: string;
  img: string | null;
  countStar: string;
  userId: number;
  storeId: number;
}): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO review (content, img, count_star, user_id, store_id)
       VALUES (?, ?, ?, ?, ?);`,
      [data.content, data.img, data.countStar, data.userId, data.storeId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 리뷰 조회
export const getReview = async (reviewId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM review WHERE review_id = ?;`,
      [reviewId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};