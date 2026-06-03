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

// 가게 전체 리뷰 가져오는 dto 
export interface ReviewItem {
  cursor: number;       // 스크롤 
  nickname: string;     // 닉네임
  countStar: string;    // 별점
  createdAt: Date;      // 작성일
  content: string;      // 내용
}

export interface ReviewListResponse {
  data: Omit<ReviewItem, "cursor">[];
  pagination: {
    cursor: number | null;
  };
}

export const responseAllFromReview = (reviews: ReviewItem[]): ReviewListResponse => {
  const lastReview = reviews[reviews.length - 1];

  return {
    data: reviews.map(({ cursor, ...rest }) => rest),
    pagination: {
      cursor: lastReview ? lastReview.cursor : null,
    },
  };
};

// 작성자의 리뷰보기
export interface UserReviewItem {
  cursor: number;
  storeName: string;
  countStar: string;
  createdAt: Date;
  content: string;
}

export interface UserReviewListResponse {
  data: Omit<UserReviewItem, "cursor">[];
  pagination: {
    cursor: number | null;
  };
}

export const responseFromUserReviews = (reviews: UserReviewItem[]): UserReviewListResponse => {
  const lastReview = reviews[reviews.length - 1];

  return {
    data: reviews.map(({ cursor, ...rest }) => rest),
    pagination: {
      cursor: lastReview ? lastReview.cursor : null,
    },
  };
};