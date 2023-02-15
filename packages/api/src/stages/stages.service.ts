import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { CreateLobbyArgs } from "../lobbies/dto/create-lobby.args";
import { LobbiesService } from "../lobbies/lobbies.service";
import { createLobbyName } from "../lobbies/lobby.logic";
import { RoundsService } from "../rounds/rounds.service";
import { CreateLobbiesResponse } from "./dto/create-lobbies.result";
import { CreateStageArgs } from "./dto/create-stage.args";
import { UpdateStageArgs } from "./dto/update-stage.args";
import { UpdateTiebreakersArgs } from "./dto/update-tiebreakers.args";
import { Stage } from "./stage.entity";
import { Tiebreaker } from "./tiebreaker.entity";
import { getAll } from "./tiebreaker.logic";

export const PLAYERS_IN_TFT_LOBBY = 8;

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage) private stageRepository: Repository<Stage>,
    private roundService: RoundsService,
    private lobbiesService: LobbiesService,
  ) {}

  findOne(id: number, relations?: string[]): Promise<Stage> {
    return this.stageRepository.findOne(id, {
      relations,
    });
  }

  findAllByTournament(tournamentId: number): Promise<Stage[]> {
    return this.stageRepository.find({
      where: { tournamentId },
      order: { sequence: "ASC" },
    });
  }

  async findPreviousStage(stage: Stage): Promise<Stage> {
    const allTournamentStages = await this.findAllByTournament(
      stage.tournamentId,
    );
    const stageIndex = allTournamentStages.findIndex((s) => s.id === stage.id);
    if (stageIndex <= 0) {
      throw new NotFoundException();
    }
    return allTournamentStages[stageIndex - 1];
  }

  findTiebreakers(): Tiebreaker[] {
    return getAll();
  }

  async createOne(payload: CreateStageArgs): Promise<Stage> {
    const stage = await this.stageRepository.save(payload);
    this.createRounds(stage.id, payload.roundCount);
    return stage;
  }

  async updateOne({ id, ...rest }: UpdateStageArgs): Promise<Stage> {
    const stage = await this.stageRepository.findOne(id);
    if (!stage) {
      throw new NotFoundException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { roundCount, ...updatePayload } = rest;
    await this.stageRepository.update({ id }, updatePayload);
    return this.stageRepository.findOne(id);
  }

  async updateTiebreakers({
    id,
    ...rest
  }: UpdateTiebreakersArgs): Promise<Stage> {
    const stage = await this.stageRepository.findOne(id);
    if (!stage) {
      throw new NotFoundException();
    }

    await this.stageRepository.update({ id }, rest);
    return this.stageRepository.findOne(id);
  }

  async deleteOne(id: number): Promise<DeleteResponse> {
    await this.stageRepository.delete({ id });
    return new DeleteResponse(id);
  }

  async generateLobbies(
    stageId: number,
    roundsPerLobbyGroup: number,
    playerCount: number,
  ): Promise<CreateLobbiesResponse> {
    const stageRoundCount = await this.roundService.countByStage(stageId);
    const numberOfLobbyGroups = stageRoundCount / roundsPerLobbyGroup;
    const numberOfLobbiesPerGroup = playerCount / PLAYERS_IN_TFT_LOBBY;
    const lobbyGroupsToCreate = new Array(numberOfLobbyGroups)
      .fill(1)
      .map((_, index) => ({
        roundsPlayed: roundsPerLobbyGroup,
        sequence: index + 1,
        stageId: stageId,
      }));
    const lobbyGroups = await this.lobbiesService.createManyLobbyGroup(
      lobbyGroupsToCreate,
    );
    const lobbyQuantityArray = new Array(numberOfLobbiesPerGroup).fill(1);
    const lobbiesToCreate = lobbyGroups.flatMap(
      ({ id: lobbyGroupId, sequence }): CreateLobbyArgs[] => {
        return lobbyQuantityArray.map((_, index) => ({
          lobbyGroupId: lobbyGroupId,
          name: createLobbyName(sequence, index + 1),
          sequence: index + 1,
          stageId,
        }));
      },
    );
    const lobbies = await this.lobbiesService.createMany(lobbiesToCreate);
    return {
      createdLobbyGroups: lobbyGroups.length,
      createdLobbies: lobbies.length,
    };
  }

  private async createRounds(stageId: number, roundCount: number) {
    const iterable = new Array(roundCount).fill({});
    const roundCreationPromises = iterable.map((_, index) =>
      this.roundService.createOne({ sequence: index + 1, stageId }),
    );
    return Promise.all(roundCreationPromises);
  }
}
