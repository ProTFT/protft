import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { PaginationArgs } from "../lib/dto/pagination.args";
import { SearchQuery } from "../lib/SearchQuery";
import { Tournament } from "../tournaments/tournament.entity";
import { CreatePlayerArgs } from "./dto/create-player.args";
import { BaseGetPlayerArgs, GetPlayerArgs } from "./dto/get-players.args";
import { Player } from "./player.entity";

interface PlayerCountry {
  country: string;
}

interface PlayerRegion {
  region: string;
}

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private searchQueryProvider: SearchQuery,
  ) {}

  async findOne(id: number) {
    return this.playerRepository.findOne(id);
  }

  async findAll(
    { searchQuery, ...filters }: BaseGetPlayerArgs,
    { take = 10, skip = 0 }: PaginationArgs,
  ): Promise<Player[]> {
    const searchQueryFilter =
      this.searchQueryProvider.getSearchQueryFilter(searchQuery);
    return this.playerRepository.find({
      where: {
        ...searchQueryFilter,
        ...filters,
      },
      take,
      skip,
    });
  }

  async createOne({
    name,
    country,
    region,
  }: CreatePlayerArgs): Promise<Player> {
    return this.playerRepository.save({ name, country, region });
  }

  async findUniqueCountries(): Promise<string[]> {
    const rawResults = await this.playerRepository
      .createQueryBuilder("player")
      .select("country")
      .distinct(true)
      .orderBy("country")
      .execute();
    return this.unpackBy<PlayerCountry>(rawResults, "country");
  }

  async findUniqueRegions(): Promise<string[]> {
    const rawResults = await this.playerRepository
      .createQueryBuilder("player")
      .select("region")
      .distinct(true)
      .orderBy("region")
      .execute();
    return this.unpackBy<PlayerRegion>(rawResults, "region");
  }

  async findTournamentsPlayed(id: number): Promise<Tournament[]> {
    return this.playerRepository
      .createQueryBuilder()
      .select("t.*")
      .distinct()
      .from("lobby_players_player", "p")
      .innerJoin("lobby", "l", "l.id = p.lobbyId")
      .innerJoin("stage", "s", "s.id = l.stageId")
      .innerJoin("tournament", "t", "t.id = s.tournamentId")
      .where({ playerId: id })
      .orderBy("t.startDate", "DESC")
      .execute();
  }

  unpackBy<T>(result: T[], property: keyof T) {
    return result.map((entry) => entry[property]);
  }
}
