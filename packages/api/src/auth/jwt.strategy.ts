import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Roles } from "../users/user.entity";

export interface JwtUser {
  userId: number;
  username: string;
  roles: Roles[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        /* istanbul ignore next */
        (req) => {
          return req.signedCookies && req.signedCookies["auth"];
        },
      ]),
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: {
    sub: number;
    username: string;
    roles: Roles[];
  }): Promise<JwtUser> {
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
