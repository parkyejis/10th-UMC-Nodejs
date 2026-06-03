export const bodyToReview = (body) => {
    return {
        content: body.content,
        img: body.img ?? null,
        countStar: body.countStar,
        userId: body.userId,
        storeName: body.storeName,
    };
};
export const responseFromReview = ({ review, store, }) => {
    return {
        reviewId: review.review_id,
        content: review.content,
        img: review.img,
        countStar: review.count_star,
        userId: review.user_id,
        storeId: store.store_id,
        storeName: store.name,
    };
};
export const responseAllFromReview = (reviews) => {
    const lastReview = reviews[reviews.length - 1];
    return {
        data: reviews.map(({ cursor, ...rest }) => rest),
        pagination: {
            cursor: lastReview ? lastReview.cursor : null,
        },
    };
};
export const responseFromUserReviews = (reviews) => {
    const lastReview = reviews[reviews.length - 1];
    return {
        data: reviews.map(({ cursor, ...rest }) => rest),
        pagination: {
            cursor: lastReview ? lastReview.cursor : null,
        },
    };
};
//# sourceMappingURL=review.dto.js.map