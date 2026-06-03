import { Controller, Post, Patch, Get, Body, Route, Tags, SuccessResponse, Request, Middlewares, Security   } from "tsoa";
import { bodyToUser, 
  type UserSignUpRequest, 
  type UserSignUpResponse,
  type UserLoginRequest,
  type UserLoginResponse,
  type UserUpdateRequest,
  type UserUpdateResponse,
 } from "../dtos/user.dto.js";
 import passport from "passport";
import { userSignUp, userLogin, userUpdate, getMyInfo } from "../services/user.service.js";
import { authorizeUser } from "../../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success } from "../../../common/response/response.js";

const isLogin = passport.authenticate("jwt", { session: false });

@Route("users")
@Tags("유저")
export class UserController extends Controller {

  @Post("signup")
  public async signUp(
    @Body() body: UserSignUpRequest
  ): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);
    const user = await userSignUp(body);
    return success(user);
  }

  // 로그인
  @Post("login")
  public async login(
    @Body() body: UserLoginRequest
  ): Promise<ApiResponse<UserLoginResponse>> {
    const tokens = await userLogin(body);
    return success(tokens);
  }

  @Get("mypage")
  @Security("Bearer")
  @Middlewares(isLogin)
  public async getMe(
    @Request() req: ExpressRequest
  ): Promise<ApiResponse<UserUpdateResponse>> {
    const userId = (req.user as any).id;
    const user = await getMyInfo(userId);
    return success(user);
  }

  // 내 정보 수정 (로그인 필요)
  @Patch("me")
  @Security("Bearer") 
  @Middlewares(isLogin)
  public async updateMe(
    @Body() body: UserUpdateRequest,
    @Request() req: ExpressRequest
  ): Promise<ApiResponse<UserUpdateResponse>> {
    const userId = (req.user as any).id;
    const user = await userUpdate(userId, body);
    return success(user);
  }
}