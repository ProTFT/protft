import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Set } from "./set.entity";

@Injectable()
export class SetsService {
  constructor(@InjectRepository(Set) private setRepository: Repository<Set>) {}

  findAll(): Promise<Set[]> {
    return this.setRepository.find({
      order: {
        id: "ASC",
      },
    });
  }

  findOne(id: number): Promise<Set> {
    return this.setRepository.findOne(id);
  }
}
