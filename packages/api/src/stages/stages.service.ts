import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { CreateLobbyArgs } from "../lobbies/dto/create-lobby.args";
import { LobbiesService } from "../lobbies/lobbies.service";
import { Lobby } from "../lobbies/lobby.entity";
import { RoundsService } from "../rounds/rounds.service";
import { CreateLobbiesResponse } from "./dto/create-lobbies.result";
import { CreateStageArgs } from "./dto/create-stage.args";
import { UpdateStageArgs } from "./dto/update-stage.args";
import { Stage } from "./stage.entity";

const PLAYERS_IN_TFT_LOBBY = 8;

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
    await this.stageRepository.update({ id }, rest);
    return this.stageRepository.findOne(id);
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
          name: this.createLobbyName(sequence, index + 1),
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

  async deleteOne(id: number): Promise<DeleteResponse> {
    await this.stageRepository.delete({ id });
    return new DeleteResponse(id);
  }

  private async createRounds(stageId: number, roundCount: number) {
    for (let i = 0; i < roundCount; i++) {
      await this.roundService.createOne({ sequence: i, stageId });
    }
  }

  private createLobbyName(
    lobbyGroupSequence: number,
    lobbySequence: number,
  ): string {
    const BASE_CHARCODE = 64;
    return (
      String.fromCharCode(BASE_CHARCODE + lobbySequence).toUpperCase() +
      String(lobbyGroupSequence)
    );
  }
}
