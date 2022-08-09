import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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

  unpackBy<T>(result: T[], property: keyof T) {
    return result.map((entry) => entry[property]);
  }
}
