export interface ReviewCreateRequest {
  content: string;
  img?: string;
  countStar: "1" | "2" | "3" | "4" | "5";
  userId: number;
  storeName: string;
}

export const bodyToReview = (body: ReviewCreateRequest) => {
  return {
    content: body.content,
    img: body.img ?? null,
    countStar: body.countStar,
    userId: body.userId,
    storeName: body.storeName,
  };
};

export interface ReviewCreateResponse {
  reviewId: number;
  content: string;
  img: string | null;
  countStar: string;
  userId: number;
  storeId: number;
  storeName: string;
}

export const responseFromReview = ({
  review,
  store,
}: {
  review: any;
  store: any;
}): ReviewCreateResponse => {
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