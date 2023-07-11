import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateServerDto } from "./dto/create-server.dto";
import { Server } from "./server.entity";

@Injectable()
export class ServersService {
  constructor(
    @InjectRepository(Server) private serverRepository: Repository<Server>,
  ) {}

  createOne(body: CreateServerDto) {
    return this.serverRepository.save(body);
  }

  findAll() {
    return this.serverRepository.find();
  }
}
