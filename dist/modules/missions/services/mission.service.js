import { prisma } from "../../../db.config.js";
import { responseFromMission, responseFromMissions } from "../dtos/mission.dto.js";
import { getStoreByName, addMission, getMission, getStoreAllMissions } from "../repositories/mission.repository.js";
export const createMission = async (data) => {
    const store = await getStoreByName(data.storeName);
    if (store === null) {
        throw new Error("없는 가게입니다.");
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
export const listStoreMissions = async ({ storeId, cursor, }) => {
    const missions = await getStoreAllMissions({
        storeId: BigInt(storeId),
        cursor,
        take: 5,
    });
    return responseFromMissions(missions);
};
//# sourceMappingURL=mission.service.js.map