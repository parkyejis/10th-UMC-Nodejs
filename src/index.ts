import dotenv from "dotenv";
import express from "express"; 
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// 2. 타입으로만 쓸 것들 가져오기
import type { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/error/app.error.js";

import swaggerUi from "swagger-ui-express";
// ESM 환경에서는 JSON 파일을 가져올 때 아래와 같이 처리합니다.
import path from "path";
import fs from "fs";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use((req: Request, res: Response, next: NextFunction) => {
  res.error = function ({ errorCode = null, message = null, data = null }) {
    return this.json({
      resultType: "FAILED",
      error: { errorCode, message, data },
      data: null,
    });
  };
  next();
});


// 1. TSOA가 생성한 swagger.json 읽어오기
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);

// 2. Swagger UI 연결
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 2. 미들웨어 설정
app.use(cors({
  //1. origin을 * 대신 정확한 주소 사용 
    origin: ["http://127.0.0.1:5500", "http://localhost:3000"], 

    // 2. 쿠키를 허용하는 credentials 옵션 켜기
    credentials: true, 
}));            // cors 방식 허용                 
app.use(express.static('public'));    // 정적 파일 접근      
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석


// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

// 쿠키 만드는 라우터 
app.get('/setcookie', (req, res) => {
    // 'myCookie'라는 이름으로 'hello' 값을 가진 쿠키를 생성
    res.cookie('myCookie', 'hello', { maxAge: 60000 }); // 60초간 유효
    res.send('쿠키가 생성되었습니다!');
});

// 쿠키 읽는 라우터 
app.get('/getcookie', (req, res) => {
    // cookie-parser 덕분에 req.cookies 객체에서 바로 꺼내 쓸 수 있음
    const myCookie = req.cookies.myCookie; 
    
    if (myCookie) {
        console.log(req.cookies); // { myCookie: 'hello' }
        res.send(`당신의 쿠키: ${myCookie}`);
    } else {
        res.send('쿠키가 없습니다.');
    }
});

// tsoa가 생성한 라우터 등록 (기존 app.post, app.get 전부 대체!)
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    message: err.message || null,
    data: err.data || null,
  });
});


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