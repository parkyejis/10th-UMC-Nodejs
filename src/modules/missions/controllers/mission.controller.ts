import { Controller, Post, Get, Body, Route, Tags, SuccessResponse, Path, Query } from "tsoa";
import { bodyToMission, type MissionCreateRequest, type MissionCreateResponse, type MissionListResponse } from "../dtos/mission.dto.js";
import { createMission, listStoreMissions } from "../services/mission.service.js";
import { ApiResponse, success } from "../../../common/response/response.js";

@Route("stores")
@Tags("미션")
export class MissionController extends Controller {

  @Post("{storeId}/mission")
  public async createMission(
    @Path() storeId: number,
    @Body() body: MissionCreateRequest
  ): Promise<ApiResponse<MissionCreateResponse>> {
    console.log("미션 추가를 요청했습니다!");
    console.log("body:", body);

    const mission = await createMission(bodyToMission(body));
    return success(mission)
  }

  @Get("{storeId}/mission")
  public async listStoreMissions(
    @Path() storeId: number,
    @Query() cursor?: number
  ): Promise<ApiResponse<MissionListResponse>> {
    const list = await listStoreMissions({ storeId, cursor });
    return success(list)
  }
}