// 가게 추가 요청 DTO
export interface StoreCreateRequest {
  name: string;
  category: string;
  startTime: string;
  endTime: string;
  localName: string; // 지역명으로 지역 조회/생성
}

export const bodyToStore = (body: StoreCreateRequest) => {
  return {
    name: body.name,
    category: body.category,
    startTime: body.startTime,
    endTime: body.endTime,
    localName: body.localName,
  };
};

export interface StoreCreateResponse {
  id: number;
  name: string;
  category: string;
  startTime: string;
  endTime: string;
  rating: number;
  localId: number;
  localName: string;
}

export const responseFromStore = ({
  store,
  local,
}: {
  store: any;
  local: any;
}): StoreCreateResponse => {
  return {
    id: Number(store.storeId),      // store_id → storeId
    name: store.name,
    category: store.category,
    startTime: store.startTime,     // start_time → startTime
    endTime: store.endTime,         // end_time → endTime
    rating: store.rating,
    localId: Number(local.localId), // local_id → localId
    localName: local.localName,     // local_name → localName
  };
};