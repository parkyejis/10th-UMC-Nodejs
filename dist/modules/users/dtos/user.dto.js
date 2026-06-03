// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body) => {
    const birth = new Date(body.birth); //날짜 변환
    return {
        email: body.email, //필수 
        name: body.name, // 필수
        gender: body.gender, // 필수
        birth, // 필수
        address: body.address || "", //선택 
        detailAddress: body.detailAddress || "", //선택 
        phoneNumber: body.phoneNumber, //필수
        preferences: body.preferences, // 필수 
    };
};
export const responseFromUser = (data) => {
    const perferCategory = data.preferences.map((p) => p.foodCategory.name);
    return {
        email: data.user.email,
        name: data.user.name,
        preferCategory: perferCategory,
    };
};
//# sourceMappingURL=user.dto.js.map