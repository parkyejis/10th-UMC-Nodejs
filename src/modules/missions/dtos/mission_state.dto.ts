export interface MissionStateCreateRequest {
  userId: number;
  missionId: number;
}

export const bodyToMissionState = (body: MissionStateCreateRequest) => {
  return {
    userId: body.userId,
    missionId: body.missionId,
  };
};

export interface MissionStateCreateResponse {
  stateId: number;
  userId: number;
  missionId: number;
  missionDetail: string;
  point: number;
  state: string;
}

export const responseFromMissionState = ({
  missionState,
  mission,
}: {
  missionState: any;
  mission: any;
}): MissionStateCreateResponse => {
  return {
    stateId: missionState.state_id,
    userId: missionState.user_id,
    missionId: mission.mission_id,
    missionDetail: mission.detail,
    point: mission.point,
    state: missionState.state,
  };
};

// 유저 미션 리스트 
export interface UserMissionItem {
  cursor: number;
  storeName: string;
  missionDetail: string;
  point: number;
  state: string;
}

export interface UserMissionListResponse {
  data: Omit<UserMissionItem, "cursor">[];
  pagination: {
    cursor: number | null;
  };
}

export const responseFromUserMissions = (missions: UserMissionItem[]): UserMissionListResponse => {
  const lastMission = missions[missions.length - 1];

  return {
    data: missions.map(({ cursor, ...rest }) => rest),
    pagination: {
      cursor: lastMission ? lastMission.cursor : null,
    },
  };
};

// 미션 상태 바꾸기
export interface MissionStateUpdateResponse {
  stateId: number;
  missionId: number;
  userId: number;
  state: string;
}

export const responseFromMissionStateUpdate = (missionState: any): MissionStateUpdateResponse => {
  return {
    stateId: Number(missionState.stateId),
    missionId: Number(missionState.missionId),
    userId: missionState.userId,
    state: missionState.state,
  };
};