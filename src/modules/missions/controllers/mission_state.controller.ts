import { Controller, Post, Get, Patch, Body, Route, Tags, SuccessResponse, Path, Query } from "tsoa";
import { bodyToMissionState,  MissionStateCreateRequest,  MissionStateCreateResponse,  UserMissionListResponse, MissionStateUpdateResponse } from "../dtos/mission_state.dto.js";
import { challengeMission, listUserMissions, changeMissionState } from "../services/mission_state.service.js";

@Route("missions")
@Tags("미션 상태")
export class MissionStateController extends Controller {

  @Post("")
  @SuccessResponse(200, "미션 도전 성공")
  public async challengeMission(
    @Body() body: MissionStateCreateRequest
  ): Promise<MissionStateCreateResponse> {
    console.log("미션 도전을 요청했습니다!");
    console.log("body:", body);

    return await challengeMission(bodyToMissionState(body));
  }

  @Patch("{missionId}")
  @SuccessResponse(200, "미션 상태 변경 성공")
  public async changeMissionState(
    @Path() missionId: number,
    @Body() body: { userId: number }
  ): Promise<MissionStateUpdateResponse> {
    return await changeMissionState(missionId, body.userId);
  }
}

@Route("users")
@Tags("유저 미션")
export class UserMissionController extends Controller {

  @Get("{userId}/mission")
  @SuccessResponse(200, "유저 미션 목록 조회 성공")
  public async listUserMissions(
    @Path() userId: number,
    @Query() cursor?: number
  ): Promise<UserMissionListResponse> {
    return await listUserMissions({ userId, cursor });
  }
}