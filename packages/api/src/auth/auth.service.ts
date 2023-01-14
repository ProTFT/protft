import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }
    const isCorrectPassword = await compare(pass, user.password);
    if (isCorrectPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async login(user: any, res: Response) {
    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);
    res.cookie("auth", token, {
      httpOnly: true,
      sameSite: "none",
      signed: true,
      secure: true,
    });
    return res;
  }

  public async logout(res: Response) {
    res.clearCookie("auth");
    return res;
  }

  public async signin(username: string, password: string) {
    const userAlreadyExists = await this.usersService.findOne(username);
    if (userAlreadyExists) {
      throw new BadRequestException();
    }
    return await this.usersService.createOne(username, password);
  }
}
