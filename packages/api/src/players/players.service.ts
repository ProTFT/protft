import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tournament } from "../tournaments/tournament.entity";
import { CreatePlayerArgs } from "./dto/create-player.args";
import { GetPlayerArgs } from "./dto/get-players.args";
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
  ) {}

  async findOne(id: number) {
    return this.playerRepository.findOne(id);
  }

  async findAll(filters: GetPlayerArgs): Promise<Player[]> {
    return this.playerRepository.find({ where: filters });
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
