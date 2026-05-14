import { prisma } from "../../../db.config.js";
import { responseFromMission, responseFromMissions } from "../dtos/mission.dto.js";
import {
  getStoreByName,
  addMission,
  getMission,
  getStoreAllMissions
} from "../repositories/mission.repository.js";
import { DuplicateUserEmailError } from "../../../common/error/error.js";

export const createMission = async (data: {
  detail: string;
  point: number;
  storeName: string;
}) => {
  const store = await getStoreByName(data.storeName);
  if (store === null) {
    throw new DuplicateUserEmailError("존재하지 않는 가게입니다.", data.storeName);
  }

  const mission = await prisma.$transaction(async (tx) => {
    const missionId = await addMission({
      detail: data.detail,
      point: data.point,
      storeId: store.storeId,
    });
    return await getMission(missionId);
  });

  return responseFromMission({ mission, store });
};

export const listStoreMissions = async ({
  storeId,
  cursor,
}: {
  storeId: number;
  cursor?: number;
}) => {
  const missions = await getStoreAllMissions({
    storeId: BigInt(storeId),
    cursor,
    take: 5,
  });

  return responseFromMissions(missions);
};