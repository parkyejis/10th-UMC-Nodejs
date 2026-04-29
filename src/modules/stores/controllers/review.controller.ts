import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js";

export const handleCreateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  try {
    const review = await createReview(bodyToReview(req.body));
    res.status(StatusCodes.OK).json({ result: review });
  } catch (err: any) {
    if (err.message === "없는 가게입니다.") {
      res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
      return;
    }
    next(err);
  }
};