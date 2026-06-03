import { prisma } from "../../../db.config.js";
import { responseFromReview, responseAllFromReview, responseFromUserReviews } from "../dtos/review.dto.js";
import { getStoreByName, addReview, getReview, getAllStoreReviews, getUserAllReviews } from "../repositories/review.repository.js";
// 리뷰 생성
export const createReview = async (data) => {
    const store = await getStoreByName(data.storeName);
    if (store === null) {
        throw new Error("없는 가게입니다.");
    }
    const review = await prisma.$transaction(async (tx) => {
        const reviewId = await addReview({
            content: data.content,
            img: data.img,
            countStar: data.countStar,
            userId: data.userId,
            storeId: store.storeId,
        }, tx);
        return await getReview(reviewId, tx);
    });
    return responseFromReview({ review, store });
};
// 가게 모든 리뷰 가져오기 
export const listStoreReviews = async ({ storeId, cursor, }) => {
    const reviews = await getAllStoreReviews({
        storeId: BigInt(storeId),
        cursor,
        take: 5,
    });
    return responseAllFromReview(reviews);
};
// 유저 리뷰 가져오는 서비스
export const listUserReviews = async ({ userId, cursor, }) => {
    const reviews = await getUserAllReviews({ userId, cursor, take: 5 });
    return responseFromUserReviews(reviews);
};
//# sourceMappingURL=review.service.js.map