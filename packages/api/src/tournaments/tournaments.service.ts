import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { Player } from "../players/player.entity";
import { SetsService } from "../sets/sets.service";
import {
  CreateTournamentPlayerArgs,
  CreateTournamentPlayerByNameArgs,
} from "./dto/create-tournament-player.args";
import { CreateTournamentArgs } from "./dto/create-tournament.args";
import { UpdateTournamentArgs } from "./dto/update-tournament.args";
import { Tournament } from "./tournament.entity";
import slugify from "slugify";
import { getSearchQueryFilter } from "../lib/SearchQuery";
import { parseMultilinePlayerNamesFromAll } from "../lib/MultilineInput";
import {
  afterOrToday,
  afterToday,
  beforeOrToday,
  beforeToday,
} from "../lib/DBRawFilter";

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    private setsService: SetsService,
  ) {}

  findAll(searchQuery?: string, onlyVisible = true): Promise<Tournament[]> {
    const searchQueryFilter = getSearchQueryFilter(searchQuery);
    const visibilityFilter = onlyVisible ? { visibility: true } : {};
    return this.tournamentRepository.find({
      where: { ...searchQueryFilter, ...visibilityFilter },
      order: { startDate: "DESC" },
    });
  }

  findOne(id: number, relations?: string[]): Promise<Tournament> {
    return this.tournamentRepository.findOne(id, { relations });
  }

  findOneBySlug(slug: string): Promise<Tournament> {
    return this.tournamentRepository.findOne({ slug });
  }

  async findWithStats(): Promise<Tournament[]> {
    const [past, current] = await Promise.all([
      this.findPast(),
      this.findOngoing(),
    ]);
    return [...current, ...past];
  }

  findPast(searchQuery?: string): Promise<Tournament[]> {
    const searchQueryFilter = getSearchQueryFilter(searchQuery);
    return this.tournamentRepository.find({
      where: {
        endDate: Raw(beforeToday),
        ...searchQueryFilter,
        visibility: true,
      },
      order: { endDate: "DESC" },
    });
  }

  findOngoing(): Promise<Tournament[]> {
    return this.tournamentRepository.find({
      where: {
        startDate: Raw(beforeOrToday),
        endDate: Raw(afterOrToday),
        visibility: true,
      },
      order: { startDate: "DESC" },
    });
  }

  findUpcoming(searchQuery?: string): Promise<Tournament[]> {
    const searchQueryFilter = getSearchQueryFilter(searchQuery);
    return this.tournamentRepository.find({
      where: {
        startDate: Raw(afterToday),
        ...searchQueryFilter,
        visibility: true,
      },
      order: { startDate: "ASC" },
    });
  }

  async createOne(payload: CreateTournamentArgs): Promise<Tournament> {
    const payloadWithSlug: Partial<Tournament> = {
      ...payload,
      slug: await this.createSlug(payload),
      visibility: false,
    };
    return this.tournamentRepository.save(payloadWithSlug);
  }

  async updateOne({ id, ...rest }: UpdateTournamentArgs): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne(id);
    if (!tournament) {
      throw new NotFoundException();
    }
    await this.tournamentRepository.update({ id }, rest);
    return this.tournamentRepository.findOne(id);
  }

  async deleteOne(id: number): Promise<DeleteResponse> {
    await this.tournamentRepository.delete({ id });
    return new DeleteResponse(id);
  }

  async createTournamentPlayers({
    tournamentId,
    playerIds,
  }: CreateTournamentPlayerArgs): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne(tournamentId);
    if (!tournament) {
      throw new NotFoundException();
    }
    const playerObjects = playerIds.map((id: number) => ({
      id,
    }));
    tournament.players = playerObjects as Player[];
    return this.tournamentRepository.save(tournament);
  }

  async createTournamentPlayersByName({
    tournamentId,
    playerNames,
  }: CreateTournamentPlayerByNameArgs): Promise<Tournament> {
    const playerIds = await parseMultilinePlayerNamesFromAll(
      playerNames,
      this.tournamentRepository.manager,
    );

    return this.createTournamentPlayers({ tournamentId, playerIds });
  }

  async createMissingSlugs(): Promise<Tournament[]> {
    const allTournaments = await this.tournamentRepository.find({
      where: { slug: "" },
      relations: ["set"],
    });
    const payloads = allTournaments.map(async (tournament) =>
      this.tournamentRepository.update(
        { id: tournament.id },
        {
          slug: await this.createSlug(tournament),
        },
      ),
    );
    await Promise.all(payloads);
    return allTournaments;
  }

  private async createSlug(
    tournament: Pick<Tournament, "name" | "setId" | "region"> &
      Partial<Pick<Tournament, "set">>,
  ): Promise<string> {
    let setName = tournament.set?.name;
    if (!setName) {
      const { name } = await this.setsService.findOne(tournament.setId);
      setName = name;
    }
    return slugify(`${setName}-${tournament.region}-${tournament.name}`, {
      lower: true,
      strict: true,
    });
  }
}
