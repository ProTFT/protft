import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SetsService } from "../../sets/sets.service";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTournamentSchemaDto } from "../schema/create-tournament.schema";
import { CreateTournamentDto } from "../dto/create-tournament.dto";
import { createSlug } from "../tournament.logic";
import { Tournament } from "../entities/tournament.entity";

@Injectable()
export class TournamentsExternalService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    private setsService: SetsService,
  ) {}

  async createOne(payload: CreateTournamentSchemaDto): Promise<Tournament> {
    const payloadWithSlug: CreateTournamentDto = {
      ...payload,
      slug: await createSlug(payload, this.setsService),
      visibility: false,
    };
    return this.tournamentRepository.save(payloadWithSlug);
  }
}
