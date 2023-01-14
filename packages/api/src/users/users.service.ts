import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { hash } from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        user: username,
      },
    });
  }

  async createOne(username: string, password: string): Promise<User> {
    const saltRounds = 10;
    const encryptedPass = await hash(password, saltRounds);
    return this.userRepository.save({
      user: username,
      password: encryptedPass,
    });
  }
}
