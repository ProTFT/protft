import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PointSchema } from "./point.entity";

@Injectable()
export class PointSchemasService {
  constructor(
    @InjectRepository(PointSchema)
    private pointSchemaRepository: Repository<PointSchema>,
  ) {}

  findAll(): Promise<PointSchema[]> {
    return this.pointSchemaRepository.find();
  }

  findOne(id: number): Promise<PointSchema> {
    return this.pointSchemaRepository.findOne(id);
  }
}
