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
import { ConfigService } from "@nestjs/config";
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from "express";
import { AuthService, StrippedUser } from "./auth.service";
import { CreateUserBodyDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get("login")
  @UseGuards(JwtAuthGuard)
  /* istanbul ignore next */
  getAuthenticated(@Response() res: ExpressResponse) {
    return res.status(202).send();
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Request() req: ExpressRequest & { user: StrippedUser },
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
    if (!key || key !== this.configService.get("SIGNIN_KEY")) {
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
