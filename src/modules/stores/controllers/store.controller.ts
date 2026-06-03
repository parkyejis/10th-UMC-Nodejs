import express from "express";
import { Controller, Post, Body, Route, Tags, SuccessResponse } from "tsoa";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToStore, type StoreCreateRequest, StoreCreateResponse } from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";
import { ApiResponse, success } from "../../../common/response/response.js";

@Route("stores")
@Tags("가게")
export class StoreController extends Controller {

  @Post("")
  public async createStore(
    @Body() body: StoreCreateRequest
  ): Promise<ApiResponse<StoreCreateResponse>> {
    console.log("가게 추가를 요청했습니다!");
    console.log("body:", body);
    const store = await createStore(body)
    return success(store)
  }
}