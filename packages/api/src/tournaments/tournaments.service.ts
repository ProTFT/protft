import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository, UpdateResult } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { SearchQuery } from "../lib/SearchQuery";
import { Player } from "../players/player.entity";
import { SetsService } from "../sets/sets.service";
import { CreateTournamentPlayerArgs } from "./dto/create-tournament-player.args";
import { CreateTournamentArgs } from "./dto/create-tournament.args";
import { UpdateTournamentArgs } from "./dto/update-tournament.args";
import { Tournament } from "./tournament.entity";
import slugify from "slugify";

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    private searchQueryProvider: SearchQuery,
    private setsService: SetsService,
  ) {}

  findAll(searchQuery?: string): Promise<Tournament[]> {
    const searchQueryFilter =
      this.searchQueryProvider.getSearchQueryFilter(searchQuery);
    return this.tournamentRepository.find({
      where: { ...searchQueryFilter, visibility: true },
      order: { startDate: "DESC" },
    });
  }

  findAdminAll(searchQuery?: string): Promise<Tournament[]> {
    const searchQueryFilter =
      this.searchQueryProvider.getSearchQueryFilter(searchQuery);
    return this.tournamentRepository.find({
      where: { ...searchQueryFilter },
      order: { startDate: "DESC" },
    });
  }

  findOne(id: number): Promise<Tournament> {
    return this.tournamentRepository.findOne(id);
  }

  findOneBySlug(slug: string): Promise<Tournament> {
    return this.tournamentRepository.findOne({ slug });
  }

  findPast(): Promise<Tournament[]> {
    return this.tournamentRepository.find({
      where: { endDate: Raw((alias) => `${alias} < CURRENT_DATE`) },
      take: 10,
      order: { startDate: "DESC" },
    });
  }

  findLive(): Promise<Tournament[]> {
    return this.tournamentRepository.find({
      where: {
        startDate: Raw((alias) => `${alias} <= CURRENT_DATE`),
        endDate: Raw((alias) => `${alias} >= CURRENT_DATE`),
      },
      order: { startDate: "DESC" },
    });
  }

  findUpcoming(): Promise<Tournament[]> {
    return this.tournamentRepository.find({
      where: {
        startDate: Raw((alias) => `${alias} > CURRENT_DATE`),
      },
      take: 10,
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

  findOneWithPlayers(tournamentId: number): Promise<Tournament> {
    return this.tournamentRepository.findOne(tournamentId, {
      relations: ["players"],
    });
  }

  async createTournamentPlayer({
    tournamentId,
    playerIds,
  }: CreateTournamentPlayerArgs): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne(tournamentId);
    const playerObjects = playerIds.map((id: number) => ({
      id,
    }));
    tournament.players = playerObjects as Player[];
    return this.tournamentRepository.save(tournament);
  }

  async createSlugs(): Promise<UpdateResult[]> {
    const allTournaments = await this.tournamentRepository.find({
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
    return Promise.all(payloads);
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
