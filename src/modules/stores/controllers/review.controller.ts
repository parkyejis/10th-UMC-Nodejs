import { Controller, Post, Get, Body, Route, Tags, SuccessResponse, Path, Query } from "tsoa";
import { bodyToReview, UserReviewListResponse, type ReviewCreateRequest, type ReviewCreateResponse, type ReviewListResponse } from "../dtos/review.dto.js";
import { createReview, listStoreReviews, listUserReviews } from "../services/review.service.js";
import { ApiResponse, success } from "../../../common/response/response.js";

@Route("stores")
@Tags("리뷰")
export class ReviewController extends Controller {

  @Post("{storeId}/reviews")
  public async createReview(
    @Body() body: ReviewCreateRequest
  ): Promise<ApiResponse<ReviewCreateResponse>> {
    console.log("리뷰 추가를 요청했습니다!");
    console.log("body:", body);
    const review = createReview(bodyToReview(body));
    return success(review)
  }

  @Get("{storeId}/reviews")
  public async listStoreReviews(
    @Path() storeId: number,
    @Query() cursor?: number
  ): Promise<ApiResponse<ReviewListResponse>> {
    const list = await listStoreReviews({ storeId, cursor });
    return success(list)
  }
}

@Route("users")
@Tags("유저 리뷰")
export class UserReviewController extends Controller {

  @Get("{userId}/reviews")
  public async listUserReviews(
    @Path() userId: number,
    @Query() cursor?: number
  ): Promise<ApiResponse<UserReviewListResponse>> {
    const list = await listUserReviews({ userId, cursor });
    return success(list)
  }
}