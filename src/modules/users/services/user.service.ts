import {
  UserSignUpRequest,
  UserSignUpResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserUpdateRequest,
  UserUpdateResponse,
  responseFromUser,
  responseFromUpdatedUser,
} from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getUserByEmail,
  updateUser,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../../../common/error/error.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../../auth.config.js";
import { AppError } from "../../../common/error/app.error.js";



export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    password: data.password,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

// 로그인
export const userLogin = async (data: UserLoginRequest): Promise<UserLoginResponse> => {
  const user = await getUserByEmail(data.email);
  if (!user) {
    throw new AppError({
      errorCode: "NOT_FOUND",
      message: "존재하지 않는 이메일입니다.",
      statusCode: 404,
    });
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password ?? "");
  if (!isPasswordValid) {
    throw new AppError({
      errorCode: "UNAUTHORIZED",
      message: "비밀번호가 틀렸습니다.",
      statusCode: 401,
    });
  }

  return {
    accessToken: generateAccessToken({ id: user.id, email: user.email }),
    refreshToken: generateRefreshToken({ id: user.id }),
  };
};

export const userUpdate = async (userId: number, data: UserUpdateRequest): Promise<UserUpdateResponse> => {
  const user = await updateUser(userId, data);
  return responseFromUpdatedUser(user);
};

export const getMyInfo = async (userId: number): Promise<UserUpdateResponse> => {
  const user = await getUser(userId);
  return responseFromUpdatedUser(user);
};