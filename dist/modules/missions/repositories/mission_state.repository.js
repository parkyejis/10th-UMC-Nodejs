import { prisma } from "../../../db.config.js";
// 미션 ID로 미션 조회
export const getMissionById = async (missionId) => {
    return await prisma.mission.findUnique({
        where: { missionId },
    });
};
// 이미 도전 중인 미션인지 확인
export const getChallengingMission = async (userId, missionId) => {
    return await prisma.missionState.findFirst({
        where: {
            userId,
            missionId,
            state: "도전중",
        },
    });
};
// 미션 도전 추가
export const addMissionState = async (data) => {
    const missionState = await prisma.missionState.create({
        data: {
            userId: data.userId,
            missionId: data.missionId,
            state: "도전중",
        },
    });
    return missionState.stateId;
};
// 미션 상태 조회
export const getMissionState = async (stateId) => {
    return await prisma.missionState.findUnique({
        where: { stateId },
    });
};
// 유저 미션 가져오기
export const getUserAllMissions = async ({ userId, cursor, take = 5, }) => {
    const missions = await prisma.missionState.findMany({
        where: {
            userId,
            state: "도전중",
        },
        take,
        ...(cursor && {
            skip: 1,
            cursor: { stateId: BigInt(cursor) },
        }),
        orderBy: { stateId: "desc" },
        select: {
            stateId: true,
            state: true,
            mission: {
                select: {
                    detail: true,
                    point: true,
                    store: {
                        select: { name: true },
                    },
                },
            },
        },
    });
    return missions.map((m) => ({
        cursor: Number(m.stateId),
        storeName: m.mission.store.name,
        missionDetail: m.mission.detail,
        point: Number(m.mission.point),
        state: m.state,
    }));
};
// 상태 바꾸기 
export const updateMissionState = async (missionId, userId) => {
    return await prisma.missionState.updateMany({
        where: {
            missionId,
            userId,
            state: "도전중",
        },
        data: {
            state: "진행완료",
        },
    });
};
export const getMissionStateByMissionId = async (missionId, userId) => {
    return await prisma.missionState.findFirst({
        where: {
            missionId,
            userId,
        },
    });
};
//# sourceMappingURL=mission_state.repository.js.map