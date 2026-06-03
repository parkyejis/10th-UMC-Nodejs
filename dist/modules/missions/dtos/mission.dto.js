export const bodyToMission = (body) => {
    return {
        detail: body.detail,
        point: body.point,
        storeName: body.storeName,
    };
};
export const responseFromMission = ({ mission, store, }) => {
    return {
        missionId: mission.mission_id,
        detail: mission.detail,
        point: mission.point,
        storeId: store.store_id,
        storeName: store.name,
    };
};
export const responseFromMissions = (missions) => {
    const lastMission = missions[missions.length - 1];
    return {
        data: missions.map(({ cursor, ...rest }) => rest),
        pagination: {
            cursor: lastMission ? lastMission.cursor : null,
        },
    };
};
//# sourceMappingURL=mission.dto.js.map