import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export interface JwtUser {
  userId: number;
  username: string;
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

  async validate(payload: any): Promise<JwtUser> {
    return { userId: payload.sub, username: payload.username };
  }
}
