import { Controller, Post, Get, Patch, Body, Route, Tags, SuccessResponse, Path, Query } from "tsoa";
import { bodyToMissionState,  MissionStateCreateRequest,  MissionStateCreateResponse,  UserMissionListResponse, MissionStateUpdateResponse } from "../dtos/mission_state.dto.js";
import { challengeMission, listUserMissions, changeMissionState } from "../services/mission_state.service.js";
import { ApiResponse, success } from "../../../common/response/response.js";

@Route("missions")
@Tags("미션 상태")
export class MissionStateController extends Controller {

  @Post("")
  public async challengeMission(
    @Body() body: MissionStateCreateRequest
  ): Promise<ApiResponse<MissionStateCreateResponse>> {
    console.log("미션 도전을 요청했습니다!");
    console.log("body:", body);
    const mission = await challengeMission(bodyToMissionState(body));
    return success(mission)
  }

  @Patch("{missionId}")
  public async changeMissionState(
    @Path() missionId: number,
    @Body() body: { userId: number }
  ): Promise<ApiResponse<MissionStateUpdateResponse>> {
    const mission = await changeMissionState(missionId, body.userId);
    return success(mission)
  }
}

@Route("users")
@Tags("유저 미션")
export class UserMissionController extends Controller {

  @Get("{userId}/mission")
  public async listUserMissions(
    @Path() userId: number,
    @Query() cursor?: number
  ): Promise<ApiResponse<UserMissionListResponse>> {
    const list = await listUserMissions({ userId, cursor });
    return success(list)
  }
}