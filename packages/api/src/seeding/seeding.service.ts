import { Injectable } from "@nestjs/common";
import { SnakeSeedType } from "../lobbies/dto/snake-seed.args";
import { LobbiesService } from "../lobbies/lobbies.service";
import { snakeSeed, PlayerWithSeed } from "../lobbies/logic/snake-seed";
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";
import { LobbyPlayerInfosService } from "../lobby-player-infos/lobby-player-infos.service";
import { RoundResultsService } from "../round-results/round-results.service";
import { StagePlayerInfosService } from "../stage-player-infos/stage-player-infos.service";
import { StagesService } from "../stages/stages.service";

@Injectable()
export class SeedingService {
  constructor(
    private lobbyService: LobbiesService,
    private stagePlayerInfosService: StagePlayerInfosService,
    private lobbyPlayerInfosService: LobbyPlayerInfosService,
    private roundResultsService: RoundResultsService,
    private stageService: StagesService,
  ) {}

  async snakeSeed(
    lobbyGroupId: number,
    stageId: number,
    type: SnakeSeedType,
  ): Promise<LobbyPlayerInfo[]> {
    const lobbies = await this.lobbyService.findAllByLobbyGroup(lobbyGroupId);
    const lobbyIds = lobbies.map((lobby) => lobby.id);
    const simplePlayers = await this.getPlayers(stageId, type);
    const lobbySeeding = snakeSeed(simplePlayers);
    const lobbyPlayersInfo = lobbySeeding
      .map((lobby, index) =>
        lobby.map((playerId) => ({
          lobbyId: lobbyIds[index],
          playerId,
        })),
      )
      .flat();
    return this.lobbyPlayerInfosService.createManyLobbyPlayers(
      lobbyPlayersInfo,
    );
  }

  private async getPlayers(
    stageId: number,
    type: SnakeSeedType,
  ): Promise<PlayerWithSeed[]> {
    if (type === SnakeSeedType.SEEDING) {
      const stagePlayers = await this.stagePlayerInfosService.findAllByStage(
        stageId,
      );
      if (stagePlayers.some((player) => player.tiebreakerRanking === 0)) {
        throw new Error("Players do not have seeding configured");
      }
      return stagePlayers.map((stagePlayer) => ({
        id: stagePlayer.playerId,
        ranking: stagePlayer.tiebreakerRanking,
      }));
    }

    if (type === SnakeSeedType.CURRENT_STAGE) {
      const stage = await this.stageService.findOne(stageId);
      const results = await this.roundResultsService.overviewResultsByStage(
        stage.id,
      );
      const isThereAPlayerWithNoResults = results.some(
        (result) => !result.positions.length,
      );
      if (isThereAPlayerWithNoResults) {
        throw new Error(
          "Not every player has results registered, so it's not possible to seed",
        );
      }
      return results.map((result, index) => ({
        id: result.player.id,
        ranking: index,
      }));
    }

    if (type === SnakeSeedType.LAST_STAGE) {
      const currentStage = await this.stageService.findOne(stageId);
      const previousStage = await this.stageService.findPreviousStage(
        currentStage,
      );
      const results = await this.roundResultsService.overviewResultsByStage(
        previousStage.id,
      );
      return results.map((result, index) => ({
        id: result.player.id,
        ranking: index,
      }));
    }
  }
}
