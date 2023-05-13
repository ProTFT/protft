import { Injectable, NotFoundException } from "@nestjs/common";
import { In, Raw, Repository } from "typeorm";
import { DateTime } from "luxon";
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
import { parseMultilinePlayerNamesFromAll } from "../lib/MultilineInput";
import {
  afterOrToday,
  afterToday,
  beforeOrToday,
  beforeToday,
} from "../lib/DBRawFilter";
import { PaginationArgs } from "../lib/dto/pagination.args";
import {
  BaseGetTournamentArgs,
  GetTournamentsArgs,
} from "./dto/get-tournaments.args";
import { TournamentRepository } from "./tournament.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { StagesService } from "../stages/stages.service";

@Injectable()
export class TournamentsService {
  private customRepository: TournamentRepository;
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    private setsService: SetsService,
    private stagesService: StagesService,
  ) {
    this.customRepository = new TournamentRepository(this.tournamentRepository);
  }

  findAll(
    tournamentArgs?: GetTournamentsArgs,
    paginationArgs?: PaginationArgs,
    onlyVisible = true,
  ): Promise<Tournament[]> {
    return this.customRepository.findWithPagination(
      tournamentArgs,
      paginationArgs,
      {
        sorting: { startDate: "DESC" },
        onlyVisible: onlyVisible,
      },
    );
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

  findPast(
    tournamentArgs?: BaseGetTournamentArgs,
    paginationArgs?: PaginationArgs,
  ): Promise<Tournament[]> {
    return this.customRepository.findWithPagination(
      tournamentArgs,
      paginationArgs,
      {
        condition: { endDate: Raw(beforeToday) },
        sorting: { endDate: "DESC" },
      },
    );
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

  findUpcoming(
    tournamentArgs?: BaseGetTournamentArgs,
    paginationArgs?: PaginationArgs,
  ): Promise<Tournament[]> {
    return this.customRepository.findWithPagination(
      tournamentArgs,
      paginationArgs,
      {
        condition: { startDate: Raw(afterToday) },
        sorting: { startDate: "ASC" },
      },
    );
  }

  async findNextStageStartTime({ id, endDate }: Tournament): Promise<number> {
    const currentDate = DateTime.now().toUTC();
    const tournamentEndDate = DateTime.fromISO(endDate.toISOString()).set({
      hour: 23,
      minute: 59,
    });
    if (currentDate > tournamentEndDate) {
      return 0;
    }
    const stages = await this.stagesService.findAllByTournament(id, ["rounds"]);
    const nextStage = stages.find((stage) => {
      const stageDateTime = DateTime.fromISO(stage.startDateTime);
      const stageDateTimeWithDuration = stageDateTime.plus({
        hour: stage.rounds.length,
      });
      if (stageDateTimeWithDuration < currentDate) {
        return false;
      }
      return true;
    });
    if (!nextStage) {
      return 0;
    }
    const nextStageDateTime = DateTime.fromISO(nextStage.startDateTime);
    const diff = nextStageDateTime.diff(currentDate, "milliseconds");
    return diff.milliseconds;
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

  async updatePlayer(
    fromPlayerId: number,
    toPlayerId: number,
  ): Promise<Tournament[]> {
    const tournamentIdsWithPlayer = await this.tournamentRepository
      .createQueryBuilder("t")
      .select("t.id")
      .innerJoinAndSelect("t.players", "p")
      .where("p.id = :fromPlayerId", { fromPlayerId })
      .getMany();

    if (!tournamentIdsWithPlayer.length) {
      return;
    }

    const tournamentsWithPlayer = await this.tournamentRepository.find({
      relations: ["players"],
      where: {
        id: In(tournamentIdsWithPlayer.map((t) => t.id)),
      },
    });
    return Promise.all(
      tournamentsWithPlayer.map((tournament) => {
        const players = tournament.players;
        const updatedPlayers = players
          .map((player) => ({ id: player.id }))
          .filter((playerIdObject) => playerIdObject.id !== fromPlayerId);

        const updatedTournament = {
          ...tournament,
          players: [...updatedPlayers, { id: toPlayerId }],
        };

        return this.tournamentRepository.save(updatedTournament);
      }),
    );
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
