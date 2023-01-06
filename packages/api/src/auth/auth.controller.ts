import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { Response as ExpressResponse } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("login")
  @UseGuards(JwtAuthGuard)
  getAuthenticated(@Response() res: ExpressResponse) {
    return res.status(202).send();
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Request() req: Request & { user: any },
    @Response() res: ExpressResponse,
  ) {
    const response = await this.authService.login(req.user, res);
    return response.status(202).send();
  }

  @Post("signin")
  async signin(
    @Body()
    { username, password, key }: CreateUserBodyDto,
  ) {
    if (!key || key !== process.env.SIGNIN_KEY) {
      throw new UnauthorizedException();
    }
    await this.authService.signin(username, password);
  }

  @Post("logout")
  async logout(@Response() res: ExpressResponse) {
    const response = await this.authService.logout(res);
    return response.status(202).send();
  }
}
