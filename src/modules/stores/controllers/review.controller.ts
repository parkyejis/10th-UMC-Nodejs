import { Controller, Post, Get, Body, Route, Tags, SuccessResponse, Path, Query } from "tsoa";
import { bodyToReview, UserReviewListResponse, type ReviewCreateRequest, type ReviewCreateResponse, type ReviewListResponse } from "../dtos/review.dto.js";
import { createReview, listStoreReviews, listUserReviews } from "../services/review.service.js";

@Route("stores")
@Tags("리뷰")
export class ReviewController extends Controller {

  @Post("{storeId}/reviews")
  @SuccessResponse(200, "리뷰 추가 성공")
  public async createReview(
    @Body() body: ReviewCreateRequest
  ): Promise<ReviewCreateResponse> {
    console.log("리뷰 추가를 요청했습니다!");
    console.log("body:", body);

    return await createReview(bodyToReview(body));
  }

  @Get("{storeId}/reviews")
  @SuccessResponse(200, "가게 리뷰 목록 조회 성공")
  public async listStoreReviews(
    @Path() storeId: number,
    @Query() cursor?: number
  ): Promise<ReviewListResponse> {
    return await listStoreReviews({ storeId, cursor });
  }
}

@Route("users")
@Tags("유저 리뷰")
export class UserReviewController extends Controller {

  @Get("{userId}/reviews")
  @SuccessResponse(200, "유저 리뷰 목록 조회 성공")
  public async listUserReviews(
    @Path() userId: number,
    @Query() cursor?: number
  ): Promise<UserReviewListResponse> {
    return await listUserReviews({ userId, cursor });
  }
}