import { Controller, Post, Body, Route, Tags, SuccessResponse } from "tsoa";
import { bodyToUser, type UserSignUpRequest, type UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

@Route("users")
@Tags("유저")
export class UserController extends Controller {

  @Post("signup")
  public async signUp(
    @Body() body: UserSignUpRequest
  ): Promise<UserSignUpResponse> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);

    return await userSignUp(bodyToUser(body));
  }
}