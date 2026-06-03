// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  /** 유저 이메일 (로그인 시 사용) */
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address?: string;       // ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[];
  password: string;
}



// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body: UserSignUpRequest) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수 
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
    password: body.password,
  };
};

export interface UserPreference {
  id: number;
  foodCategoryId: number;
  name: string;
}

export interface UserSignUpResponse {
  email: string;
  name: string;
  preferCategory: UserPreference[];
}


export const responseFromUser= (data: {user:any, preferences: any[]}): UserSignUpResponse => {
    const perferCategory= data.preferences.map((p)=>p.foodCategory.name);

    return {
        email: data.user.email,
        name: data.user.name,
        preferCategory: perferCategory,
    }

}


// --- 로그인 로직 -----
export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserUpdateRequest {
  name?: string;
  gender?: string;
  birth?: Date;
  address?: string;
  detailAddress?: string;
  phoneNumber?: string;
}

export interface UserUpdateResponse {
  id: number;
  email: string;
  name: string;
  gender: string;
  phoneNumber: string;
}

export const responseFromUpdatedUser = (user: any): UserUpdateResponse => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    phoneNumber: user.phoneNumber,
  };
};