import { ResultSetHeader, RowDataPacket } from "mysql2";
import { prisma } from "../../../db.config.js";
import { ReviewItem, UserReviewItem } from "../dtos/review.dto.js";

// 가게 이름으로 가게 조회
export const getStoreByName = async (storeName: string) => {
  return await prisma.store.findFirst({
    where: { name: storeName },
  });
};

// 리뷰 추가
export const addReview = async (
  data: {
    content: string;
    img: string | null;
    countStar: string;
    userId: number;
    storeId: bigint;
  },
  tx: any = prisma
): Promise<bigint> => {
  const review = await tx.review.create({
    data: {
      content: data.content,
      img: data.img,
      countStar: data.countStar,
      userId: data.userId,
      storeId: data.storeId,
    },
  });
  return review.reviewId;
};

// 리뷰 조회
export const getReview = async (reviewId: bigint, tx: any = prisma) => {
  return await tx.review.findUnique({
    where: { reviewId },
  });
};

// 모든 리뷰 가져오기 
export const getAllStoreReviews = async ({
  storeId,
  cursor,
  take = 5,
}: {
  storeId: bigint;
  cursor?: number;
  take?: number;
}): Promise<ReviewItem[]> => {
  const reviews = await prisma.review.findMany({
    where: { storeId },
    take,
    ...(cursor && {
      skip: 1,
      cursor: { reviewId: BigInt(cursor) },
    }),
    orderBy: { reviewId: "desc" },
    select: {
      reviewId: true,
      content: true,
      countStar: true,
      createdAt: true,
      user: {
        select: { name: true },
      },
    },
  });

  return reviews.map((r) => ({
    cursor: Number(r.reviewId),
    nickname: r.user.name,
    countStar: r.countStar,
    createdAt: r.createdAt,
    content: r.content,
  }));
};


export const getUserAllReviews = async ({
  userId,
  cursor,
  take = 5,
}: {
  userId: number;
  cursor?: number;
  take?: number;
}): Promise<UserReviewItem[]> => {
  const reviews = await prisma.review.findMany({
    where: { userId },
    take,
    ...(cursor && {
      skip: 1,
      cursor: { reviewId: BigInt(cursor) },
    }),
    orderBy: { reviewId: "desc" },
    select: {
      reviewId: true,
      content: true,
      countStar: true,
      createdAt: true,
      store: {
        select: { name: true },
      },
    },
  });

  return reviews.map((r) => ({
    cursor: Number(r.reviewId),
    storeName: r.store.name,
    countStar: r.countStar,
    createdAt: r.createdAt,
    content: r.content,
  }));
};