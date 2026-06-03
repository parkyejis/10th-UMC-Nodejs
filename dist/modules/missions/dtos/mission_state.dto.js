export const bodyToMissionState = (body) => {
    return {
        userId: body.userId,
        missionId: body.missionId,
    };
};
export const responseFromMissionState = ({ missionState, mission, }) => {
    return {
        stateId: missionState.state_id,
        userId: missionState.user_id,
        missionId: mission.mission_id,
        missionDetail: mission.detail,
        point: mission.point,
        state: missionState.state,
    };
};
export const responseFromUserMissions = (missions) => {
    const lastMission = missions[missions.length - 1];
    return {
        data: missions.map(({ cursor, ...rest }) => rest),
        pagination: {
            cursor: lastMission ? lastMission.cursor : null,
        },
    };
};
export const responseFromMissionStateUpdate = (missionState) => {
    return {
        stateId: Number(missionState.stateId),
        missionId: Number(missionState.missionId),
        userId: missionState.userId,
        state: missionState.state,
    };
};
//# sourceMappingURL=mission_state.dto.js.map