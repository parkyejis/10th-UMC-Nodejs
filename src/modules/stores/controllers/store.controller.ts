import express from "express";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToStore, type StoreCreateRequest } from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";

export const handleCreateStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("가게 추가를 요청했습니다!");
  console.log("body:", req.body);

  const store = await createStore(bodyToStore(req.body as StoreCreateRequest));

  res.status(StatusCodes.OK).json({ result: store });
};