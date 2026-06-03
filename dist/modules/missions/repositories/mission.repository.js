import { prisma } from "../../../db.config.js";
// 가게 이름으로 가게 조회
export const getStoreByName = async (storeName) => {
    return await prisma.store.findFirst({
        where: { name: storeName },
    });
};
// 미션 추가
export const addMission = async (data) => {
    const mission = await prisma.mission.create({
        data: {
            detail: data.detail,
            point: data.point,
            storeId: data.storeId,
        },
    });
    return mission.missionId;
};
// 미션 조회
export const getMission = async (missionId) => {
    return await prisma.mission.findUnique({
        where: { missionId },
    });
};
// 가게 미션 리스트 가져오기 
export const getStoreAllMissions = async ({ storeId, cursor, take = 5, }) => {
    const missions = await prisma.mission.findMany({
        where: { storeId },
        take,
        ...(cursor && {
            skip: 1,
            cursor: { missionId: BigInt(cursor) },
        }),
        orderBy: { missionId: "desc" },
        select: {
            missionId: true,
            detail: true,
            point: true,
        },
    });
    return missions.map((m) => ({
        cursor: Number(m.missionId),
        missionDetail: m.detail,
        point: Number(m.point),
    }));
};
//# sourceMappingURL=mission.repository.js.map