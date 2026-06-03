export interface MissionCreateRequest {
  detail: string;
  point: number;
  storeName: string;
}

export const bodyToMission = (body: MissionCreateRequest) => {
  return {
    detail: body.detail,
    point: body.point,
    storeName: body.storeName,
  };
};

export interface MissionCreateResponse {
  missionId: number;
  detail: string;
  point: number;
  storeId: number;
  storeName: string;
}

export const responseFromMission = ({
  mission,
  store,
}: {
  mission: any;
  store: any;
}): MissionCreateResponse => {
  return {
    missionId: mission.mission_id,
    detail: mission.detail,
    point: mission.point,
    storeId: store.store_id,
    storeName: store.name,
  };
};

// 미션 상태
export interface MissionItem {
  cursor: number;
  missionDetail: string;
  point: number;
}

export interface MissionListResponse {
  data: Omit<MissionItem, "cursor">[];
  pagination: {
    cursor: number | null;
  };
}

export const responseFromMissions = (missions: MissionItem[]): MissionListResponse => {
  const lastMission = missions[missions.length - 1];

  return {
    data: missions.map(({ cursor, ...rest }) => rest),
    pagination: {
      cursor: lastMission ? lastMission.cursor : null,
    },
  };
};