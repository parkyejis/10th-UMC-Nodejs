import dotenv from "dotenv";
import express from "express"; 
// 2. 타입으로만 쓸 것들 가져오기
import type { Express, Request, Response } from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors());            // cors 방식 허용                 
app.use(express.static('public'));    // 정적 파일 접근      
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

// tsoa가 생성한 라우터 등록 (기존 app.post, app.get 전부 대체!)
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);


// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});



// app.post("/api/v1/users/signup", handleUserSignUp);
// app.post("/api/v1/store", handleCreateStore);
// app.post("/api/v1/store/review", handleCreateReview);
// app.post("/api/v1/store/mission", handleCreateMission)
// app.post("/api/v1/store/mission/state", handleChallengeMission)

// app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
// app.get("/api", handleListUserReviews);
// app.get("/api/v1/stores/:storeId/mission", handleListStoreMissions);
// app.get("/api/v1/users/:userId/mission", handleListUserMissions);

// app.patch("/api/v1/mission/:userId/:missionId", handleChangeMissionState);