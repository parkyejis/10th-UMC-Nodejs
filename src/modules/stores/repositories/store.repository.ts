import { ResultSetHeader, RowDataPacket } from "mysql2";
import { prisma } from "../../../db.config.js";

// 이름으로 지역 찾기 
export const getLocalByName = async (localName: string) => {
  return await prisma.local.findFirst({
    where: { localName },
  });
};

// 지역 생성
export const createLocal = async (localName: string) => {
  const local = await prisma.local.create({
    data: { localName },
  });
  return local.localId;
};

// 아이디로 지역 찾기 
export const getLocalById = async (localId: bigint) => {
  return await prisma.local.findUnique({
    where: { localId },
  });
};

// 가게 정보 추가
export const addStore = async (data: {
  name: string;
  category: string;
  startTime: string;
  endTime: string;
  localId: bigint;
}) => {
  const store = await prisma.store.create({
    data: {
      name: data.name,
      category: data.category,
      startTime: data.startTime,
      endTime: data.endTime,
      localId: data.localId,
    },
  });
  return store.storeId;
};

// 가게 정보 가져오기 
export const getStore = async (storeId: bigint) => {
  return await prisma.store.findUnique({
    where: { storeId },
  });
};