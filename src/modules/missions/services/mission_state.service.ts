import { prisma } from "../../../db.config.js";
import { responseFromMissionState, responseFromUserMissions, responseFromMissionStateUpdate } from "../dtos/mission_state.dto.js";
import {
  getMissionById,
  getChallengingMission,
  addMissionState,
  getMissionState,
  getUserAllMissions,
  updateMissionState,
  getMissionStateByMissionId
} from "../repositories/mission_state.repository.js";
import { DuplicateUserEmailError } from "../../../common/error/error.js";

export const challengeMission = async (data: {
  userId: number;
  missionId: number;
}) => {
  // 미션 존재 여부 검증
  const mission = await getMissionById(BigInt(data.missionId));
  if (mission === null) {
    throw new DuplicateUserEmailError("없는 미션 입니다.", data.missionId);
  }

  // 이미 도전 중인지 검증
  const challenging = await getChallengingMission(data.userId, BigInt(data.missionId));
  if (challenging !== null) {
    throw new DuplicateUserEmailError("이미 도전중인 미션 입니다.", data.missionId);
  }

  // 미션 도전 추가
  const missionState = await prisma.$transaction(async () => {
    const stateId = await addMissionState({
      userId: data.userId,
      missionId: BigInt(data.missionId),
    });
    return await getMissionState(stateId);
  });

  return responseFromMissionState({ missionState, mission });
};

// 유저 서비스
export const listUserMissions = async ({
  userId,
  cursor,
}: {
  userId: number;
  cursor?: number;
}) => {
  const missions = await getUserAllMissions({ userId, cursor, take: 5 });
  return responseFromUserMissions(missions);
};

export const changeMissionState = async (missionId: number, userId: number) => {
  // 미션 존재 여부 검증
  const mission = await getMissionById(BigInt(missionId));
  if (mission === null) {
    throw new DuplicateUserEmailError("없는 미션 입니다.",missionId);
  }

  // 도전 중인 미션인지 검증
  const challenging = await getChallengingMission(userId, BigInt(missionId));
  if (challenging === null) {
    throw new DuplicateUserEmailError("이미 도전중인 미션 입니다.", missionId);
  }

  // 진행완료로 변경
  await updateMissionState(BigInt(missionId), userId);
  const missionState = await getMissionStateByMissionId(BigInt(missionId), userId);

  return responseFromMissionStateUpdate(missionState);
};