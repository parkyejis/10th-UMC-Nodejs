import { ResultSetHeader, RowDataPacket } from "mysql2";
import { prisma } from "../../../db.config.js";
import bcrypt from "bcrypt";

// 1. User 데이터 삽입
export const addUser = async (data: any) => {
  // 1. 이미 존재하는 이메일인지 확인
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  
  if (user) {
    return null;
  }

  const hashedPassword = data.password
    ? await bcrypt.hash(data.password, 10)
    : null;

  // 2. 새로운 유저 생성
  const created = await prisma.user.create({ 
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
    } 
  });

  return created.id;
};

// 이메일로 유저 찾기
export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({ where: { email } });
};

// 유저 정보 수정
export const updateUser = async (userId: number, data: any) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.gender && { gender: data.gender }),
      ...(data.birth && { birth: new Date(data.birth) }),
      ...(data.address && { address: data.address }),
      ...(data.detailAddress && { detailAddress: data.detailAddress }),
      ...(data.phoneNumber && { phoneNumber: data.phoneNumber }),
    },
  });
};

// 2. 사용자 정보 얻기
export const getUser = async (userId: number) => {
  return await prisma.user.findFirstOrThrow({ where: { id: userId } });
};

// 3. 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 4. 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId: userId },
    include: {
      foodCategory: true, // 💡 핵심: JOIN 대신 include를 써서 연관 데이터를 가져옵니다!
    },
    orderBy: { foodCategoryId: "asc" },
  });
};