import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { compare } from "bcrypt";
import { Roles, User } from "../users/user.entity";

export type StrippedUser = Pick<User, "id" | "user">;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private readonly COOKIE_NAME = "auth";

  public async validateUser(
    username: string,
    pass: string,
  ): Promise<StrippedUser | null> {
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

  public async login(
    { user, id }: StrippedUser,
    res: Response,
  ): Promise<[Response, User]> {
    const dbUser = await this.usersService.findOne(user);
    const payload = { username: user, sub: id, roles: dbUser.roles };
    const token = this.jwtService.sign(payload);
    res.cookie(this.COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "none",
      signed: true,
      secure: true,
    });
    return [res, dbUser];
  }

  public async logout(res: Response) {
    res.clearCookie(this.COOKIE_NAME);
    return res;
  }

  public async signin({
    username,
    password,
    roles,
  }: {
    username: string;
    password: string;
    roles: Roles[];
  }) {
    const userAlreadyExists = await this.usersService.findOne(username);
    if (userAlreadyExists) {
      throw new BadRequestException();
    }
    return await this.usersService.createOne(username, password, roles);
  }
}
