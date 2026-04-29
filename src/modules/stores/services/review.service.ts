import { pool } from "../../../db.config.js";
import { responseFromReview } from "../dtos/review.dto.js";
import {
  getStoreByName,
  addReview,
  getReview,
} from "../repositories/review.repository.js";

export const createReview = async (data: {
  content: string;
  img: string | null;
  countStar: string;
  userId: number;
  storeName: string;
}) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // 가게 존재 여부 검증
    const store = await getStoreByName(data.storeName);
    if (store === null) {
      throw new Error("없는 가게입니다.");
    }

    // 리뷰 추가
    const reviewId = await addReview({
      content: data.content,
      img: data.img,
      countStar: data.countStar,
      userId: data.userId,
      storeId: store.store_id,
    });

    const review = await getReview(reviewId);

    await conn.commit();
    return responseFromReview({ review, store });

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};