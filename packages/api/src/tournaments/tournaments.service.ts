import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { In, Repository } from "typeorm";
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
import { InjectRepository } from "@nestjs/typeorm";
import { StagesService } from "../stages/stages.service";
import { CreateTournamentStageBodySchemaDto } from "./schema/create-stage.schema";
import { Stage } from "../stages/stage.entity";

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    private setsService: SetsService,
    private stagesService: StagesService,
  ) {}

  async createOne(payload: CreateTournamentArgs): Promise<Tournament> {
    const payloadWithSlug: Partial<Tournament> = {
      ...payload,
      slug: await this.createSlug(payload),
      visibility: false,
    };
    return this.tournamentRepository.save(payloadWithSlug);
  }

  async createStage(
    tournamentId: number,
    payload: CreateTournamentStageBodySchemaDto,
  ): Promise<Stage> {
    const tournament = await this.tournamentRepository.findOne(tournamentId);
    if (!tournament) {
      throw new BadRequestException("Tournament does not exist");
    }
    return this.stagesService.createOne({
      tournamentId,
      ...payload,
    });
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
