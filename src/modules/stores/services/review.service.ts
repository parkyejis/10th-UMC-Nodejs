import { prisma } from "../../../db.config.js";
import { responseFromReview, responseAllFromReview, responseFromUserReviews } from "../dtos/review.dto.js";
import { DuplicateUserEmailError } from "../../../common/error/error.js";
import {
  getStoreByName,
  addReview,
  getReview,
  getAllStoreReviews,
  getUserAllReviews
} from "../repositories/review.repository.js";
import { getStore } from "../repositories/store.repository.js"
import { getUser } from "../../users/repositories/user.repository.js"

// 리뷰 생성
export const createReview = async (data: {
  content: string;
  img: string | null;
  countStar: string;
  userId: number;
  storeName: string;
}) => {
  const store = await getStoreByName(data.storeName);
  if (store === null) {
    throw new DuplicateUserEmailError("없는 가게 입니다.", data);
  }

  const review = await prisma.$transaction(async (tx) => {
    const reviewId = await addReview(
      {
        content: data.content,
        img: data.img,
        countStar: data.countStar,
        userId: data.userId,
        storeId: store.storeId,
      },
      tx
    );
    return await getReview(reviewId, tx);
  });

  return responseFromReview({ review, store });
};

// 가게 모든 리뷰 가져오기 
export const listStoreReviews = async ({
  storeId,
  cursor,
}: {
  storeId: number;
  cursor?: number;
}) => {
  const store = await getStore(BigInt(storeId));
  if (store === null) {
    throw new DuplicateUserEmailError("없는 가게 입니다.", storeId);
  }

  const reviews = await getAllStoreReviews({  
    storeId: BigInt(storeId),
    cursor,
    take: 5,
  });

  return responseAllFromReview(reviews);
};


// 유저 리뷰 가져오는 서비스
export const listUserReviews = async ({
  userId,
  cursor,
}: {
  userId: number;
  cursor?: number;
}) => {
  const user = await getUser(userId)
  if (user === null) {
    throw new DuplicateUserEmailError("없는 회원 입니다.", userId);
  }

  const reviews = await getUserAllReviews({ userId, cursor, take: 5 });
  return responseFromUserReviews(reviews);
};