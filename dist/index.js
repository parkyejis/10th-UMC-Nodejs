import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";
import { handleCreateStore } from "./modules/stores/controllers/store.controller.js";
import { handleCreateReview, handleListStoreReviews, handleListUserReviews } from "./modules/stores/controllers/review.controller.js";
import { handleCreateMission, handleListStoreMissions } from "./modules/missions/controllers/mission.controller.js";
import { handleChallengeMission, handleListUserMissions, handleChangeMissionState } from "./modules/missions/controllers/mission_state.controller.js";
// 1. 환경 변수 설정
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// 2. 미들웨어 설정
app.use(cors()); // cors 방식 허용                 
app.use(express.static('public')); // 정적 파일 접근      
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
// 3. 기본 라우트
app.get("/", (req, res) => {
    res.send("Hello World! This is TypeScript Server!");
});
app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/store", handleCreateStore);
app.post("/api/v1/store/review", handleCreateReview);
app.post("/api/v1/store/mission", handleCreateMission);
app.post("/api/v1/store/mission/state", handleChallengeMission);
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/users/:userId/reviews", handleListUserReviews);
app.get("/api/v1/stores/:storeId/mission", handleListStoreMissions);
app.get("/api/v1/users/:userId/mission", handleListUserMissions);
app.patch("/api/v1/mission/:userId/:missionId", handleChangeMissionState);
// 4. 서버 시작
app.listen(port, () => {
    console.log(`[server]: Server is running at <http://localhost>:${port}`);
});
//# sourceMappingURL=index.js.map