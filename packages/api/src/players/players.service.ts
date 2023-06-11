import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import slugify from "slugify";
import { Brackets, ILike, Raw, Repository } from "typeorm";
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";
import { likeNameOrAlias } from "../lib/DBCompositeFilters";
import { isEqualName } from "../lib/DBRawFilter";
import { PaginationArgs } from "../lib/dto/pagination.args";
import { parseFileString } from "../lib/FileParser";
import { getSearchQueryFilter } from "../lib/SearchQuery";
import { LobbyPlayerInfosService } from "../lobby-player-infos/lobby-player-infos.service";
import { PlayerLink } from "../player-links/player-link.entity";
import { PlayerLinksService } from "../player-links/player-links.service";
import { PlayerStatsRaw } from "../round-results/dto/get-player-stats.raw";
import { RoundResultsService } from "../round-results/round-results.service";
import { StagePlayerInfosService } from "../stage-player-infos/stage-player-infos.service";
import { TournamentResultsService } from "../tournament-results/tournament-results.service";
import { TournamentsService } from "../tournaments/tournaments.service";
import { CreatePlayerArgs } from "./dto/create-player.args";
import { BaseGetPlayerArgs } from "./dto/get-players.args";
import { TournamentsPlayed } from "./dto/get-tournaments-played.out";
import { TournamentsPlayedRaw } from "./dto/get-tournaments-played.raw";
import { Player } from "./player.entity";
import { formatStats } from "./players.adapter";

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
    private roundResultsService: RoundResultsService,
    private tournamentResultsService: TournamentResultsService,
    private tournamentsService: TournamentsService,
    private lobbyPlayerInfosService: LobbyPlayerInfosService,
    private stagePlayersInfosService: StagePlayerInfosService,
    private playerLinksService: PlayerLinksService,
  ) {}

  async findAll(
    { searchQuery, ...filters }: BaseGetPlayerArgs,
    { take = 10, skip = 0 }: PaginationArgs,
    order?: { [P in EntityFieldsNames<Player>]?: "ASC" | "DESC" | 1 | -1 },
  ): Promise<Player[]> {
    const searchQueryFilter = getSearchQueryFilter(searchQuery);
    return this.playerRepository.find({
      where: {
        ...searchQueryFilter,
        ...filters,
      },
      take,
      skip,
      order: order ?? {},
    });
  }

  async findOne(id: number) {
    return this.playerRepository.findOne(id);
  }

  async findOneBySlug(slug: string) {
    return this.playerRepository.findOne({ slug });
  }

  private async findOneByName(
    name: string,
    region: string,
  ): Promise<Player | undefined> {
    const result = (await this.playerRepository
      .createQueryBuilder()
      .where({ region })
      .andWhere(new Brackets(likeNameOrAlias(name)))
      .execute()) as Player[];

    return result[0];
  }

  async updateOne(id: number, payload: Partial<Omit<Player, "id">>) {
    const player = await this.findOne(id);
    if (!player) {
      throw new NotFoundException("Player not found");
    }
    await this.playerRepository.update({ id }, payload);
    return {
      ...player,
      ...payload,
    };
  }

  async createOne({
    name,
    country,
    region,
    alias,
  }: CreatePlayerArgs): Promise<Player> {
    if (!name || !region) {
      throw new BadRequestException("Name and Region are mandatory");
    }
    const savedPlayer = await this.playerRepository.save({
      name,
      country,
      region,
      alias,
    });
    await this.playerRepository.update(
      { id: savedPlayer.id },
      { slug: this.createSlug(savedPlayer) },
    );
    return savedPlayer;
  }

  public async createBulk(fileString: string, dryRun = true): Promise<any> {
    const { titles, lines } = parseFileString(fileString);
    const [name, country, region] = titles;
    if (name !== "Name" || country !== "Country" || region !== "Region") {
      throw new BadRequestException(`${name} - ${country} - ${region}`);
    }
    const players = lines.map((line) => {
      const [name, country, region] = line.split(",");
      return {
        name,
        country,
        region,
        slug: name,
      };
    });

    const searchPlayers = await Promise.all(
      players.map((player) => this.findOneByName(player.name, player.region)),
    );

    const result = players.reduce(
      (prev, curr, index) => ({
        ...prev,
        newPlayers: [
          ...prev.newPlayers,
          ...(!searchPlayers[index] ? [curr] : []),
        ],
        repeatedPlayers: [
          ...prev.repeatedPlayers,
          ...(searchPlayers[index] ? [curr] : []),
        ],
      }),
      {
        newPlayers: [],
        repeatedPlayers: [],
        dryRun,
      },
    );

    if (!dryRun) {
      await this.playerRepository.save(result.newPlayers);
      await this.createMissingSlugs();
    }

    return result;
  }

  public async deleteOne(id: number): Promise<Player> {
    const player = await this.findOne(id);
    if (!player) {
      throw new NotFoundException("Player does not exist");
    }
    await this.playerRepository.delete({ id });
    return player;
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

  async findTournamentsPlayed(playerId: number): Promise<TournamentsPlayed[]> {
    const rawResults: TournamentsPlayedRaw[] =
      await this.playerRepository.manager
        .createQueryBuilder()
        .select(
          't.*, set.id as "setId", set.name as "setName", tr.finalPosition',
        )
        .distinct()
        .from("stage_player_info", "spi")
        .innerJoin("stage", "s", "s.id = spi.stageId")
        .innerJoin("tournament", "t", "t.id = s.tournamentId")
        .innerJoin("set", "set", "set.id = t.setId")
        .leftJoin(
          "tournament_result",
          "tr",
          "tr.tournamentId = t.id AND tr.playerId = :playerId",
          { playerId },
        )
        .where({ playerId })
        .orderBy("t.startDate", "DESC")
        .execute();

    return rawResults.map((raw) => ({
      ...raw,
      set: {
        id: raw.setId,
        name: raw.setName,
      },
    }));
  }

  async findLinks(playerId: number): Promise<PlayerLink[]> {
    return this.playerLinksService.getByPlayerId(playerId);
  }

  unpackBy<T>(result: T[], property: keyof T) {
    return result.map((entry) => entry[property]);
  }

  async createMissingSlugs(): Promise<Player[]> {
    const allPlayers = await this.playerRepository.find({
      where: [{ slug: "" }, { slug: Raw(isEqualName) }],
    });
    const payloads = allPlayers.map((player) =>
      this.playerRepository.update(
        { id: player.id },
        {
          slug: this.createSlug(player),
        },
      ),
    );
    await Promise.all(payloads);
    return allPlayers;
  }

  async getPlayerStats(player: Player, setId: number, tournamentId: number) {
    const rawStats: PlayerStatsRaw | undefined =
      await this.roundResultsService.findStatsByPlayer(
        player.id,
        setId,
        tournamentId,
      );
    return formatStats(rawStats || ({} as PlayerStatsRaw));
  }

  async merge(playerIdToMaintain: number, playerIdToRemove: number) {
    await Promise.all([
      this.tournamentResultsService.updatePlayer(
        playerIdToRemove,
        playerIdToMaintain,
      ),
      this.tournamentsService.updatePlayer(
        playerIdToRemove,
        playerIdToMaintain,
      ),
      this.stagePlayersInfosService.updatePlayer(
        playerIdToRemove,
        playerIdToMaintain,
      ),
      this.lobbyPlayerInfosService.updatePlayer(
        playerIdToRemove,
        playerIdToMaintain,
      ),
    ]);
    return this.deleteOne(playerIdToRemove);
  }

  private createSlug(player: Pick<Player, "id" | "name" | "region">): string {
    return slugify(`${player.id}-${player.name}`, {
      lower: true,
      strict: true,
    });
  }
}
