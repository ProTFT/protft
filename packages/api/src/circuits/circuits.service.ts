import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import slugify from "slugify";
import { Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { SetsService } from "../sets/sets.service";
import { Circuit } from "./circuit.entity";
import { CreateCircuitArgs } from "./dto/create-circuit.args";
import { DeleteCircuitArgs } from "./dto/delete-circuit.args";
import { UpdateCircuitArgs } from "./dto/update-circuit.args";

@Injectable()
export class CircuitsService {
  constructor(
    @InjectRepository(Circuit)
    private circuitRepository: Repository<Circuit>,
    private setsService: SetsService,
  ) {}

  findAll(): Promise<Circuit[]> {
    return this.circuitRepository.find();
  }

  findOne(id: number): Promise<Circuit> {
    return this.circuitRepository.findOne(id);
  }

  async createOne(
    payload: CreateCircuitArgs,
  ): Promise<Omit<Circuit, "slug" | "set">> {
    const [{ id, name, region }, { name: setName }] = await Promise.all([
      this.circuitRepository.save(payload),
      this.setsService.findOne(payload.setId),
    ]);

    await this.circuitRepository.update(
      { id },
      {
        slug: slugify(`${setName}-${region.join("-")}-${name}`, {
          lower: true,
        }),
      },
    );

    return {
      id,
      ...payload,
    };
  }

  async updateOne(payload: UpdateCircuitArgs): Promise<Circuit> {
    const { id, ...restOfPayload } = payload;
    const updatedProperties = Object.fromEntries(
      Object.entries(restOfPayload).filter(([, value]) => Boolean(value)),
    );

    await this.circuitRepository.update({ id }, updatedProperties);

    return this.findOne(id);
  }

  async deleteOne(payload: DeleteCircuitArgs): Promise<DeleteResponse> {
    const { id } = payload;

    await this.circuitRepository.delete({ id });

    return { id };
  }
}
