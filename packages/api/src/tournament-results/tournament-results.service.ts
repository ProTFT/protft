import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { getOrdinal } from "../lib/Number";
import { LobbyGroupWithLobbies } from "../round-results/dto/get-lobby-results.out";
import { PlayerResultsWithPast } from "../round-results/round-result.logic";
import { RoundResultsService } from "../round-results/round-results.service";
import { Stage } from "../stages/stage.entity";
import { PLAYERS_IN_TFT_LOBBY, StagesService } from "../stages/stages.service";
import { StageType } from "../stages/types/StageType";
import { arrayToCardinals } from "./logic/arrayToCardinals";
import { TournamentResult } from "./tournament-result.entity";

@Injectable()
export class TournamentResultsService {
  constructor(
    @InjectRepository(TournamentResult)
    private tournamentResultRepository: Repository<TournamentResult>,
    private stagesService: StagesService,
    private roundResultsService: RoundResultsService,
  ) {}

  findAllByTournament(tournamentId: number): Promise<TournamentResult[]> {
    return this.tournamentResultRepository.find({ where: { tournamentId } });
  }

  async lockResults(tournamentId: number): Promise<TournamentResult[]> {
    const tournamentStages = await this.stagesService.findAllByTournament(
      tournamentId,
    );

    const sortedStages = tournamentStages.sort(
      (a, b) => a.sequenceForResult - b.sequenceForResult,
    );

    const finalResults: Pick<
      TournamentResult,
      "tournamentId" | "finalPosition" | "playerId"
    >[] = [];

    const arrayOfLobbyPlayers = new Array(PLAYERS_IN_TFT_LOBBY).fill(0);
    const processedStages = [];

    for (const currentStage of sortedStages.reverse()) {
      if (processedStages.includes(currentStage.id)) {
        continue;
      }
      if (currentStage.stageType === StageType.RANKING) {
        const results = await this.fetchResultsForStageRankingPlusParallelOnes(
          currentStage,
          sortedStages,
          processedStages,
        );

        const resultsForRemainingPlayers = results.map((stageResult) =>
          stageResult.filter(
            (result) =>
              !finalResults.find((fr) => fr.playerId === result.player.id),
          ),
        );

        let consolidatedResults = [];

        if (resultsForRemainingPlayers.length > 1) {
          resultsForRemainingPlayers.forEach((stageResult) => {
            stageResult.forEach((_, index) => {
              consolidatedResults[index] = [
                ...(consolidatedResults[index] || []),
                stageResult[index].player.id,
              ];
            });
          });
        } else {
          consolidatedResults = resultsForRemainingPlayers[0].map((result) => [
            result.player.id,
          ]);
        }

        const result = arrayToCardinals(
          consolidatedResults,
          finalResults.length,
        );

        result.forEach((r) => {
          finalResults.push({
            tournamentId,
            finalPosition: r.finalPosition,
            playerId: r.id,
          });
        });
      }

      if (currentStage.stageType === StageType.GROUP_BASED) {
        const results = await this.fetchResultsForStageGroupPlusParallelOnes(
          currentStage,
          sortedStages,
          processedStages,
        );

        for (const lobbyGroup of [results]) {
          const lobbies = lobbyGroup.lobbies;
          arrayOfLobbyPlayers.forEach((_, positionIndex) => {
            const offset = finalResults.length + 1;
            lobbies.forEach((lobby, _, allLobbies) => {
              if (
                !finalResults.find(
                  (result) =>
                    result.playerId === lobby.results[positionIndex].player.id,
                )
              ) {
                finalResults.push({
                  tournamentId,
                  playerId: lobby.results[positionIndex].player.id,
                  finalPosition: `${getOrdinal(offset)}-${getOrdinal(
                    offset + allLobbies.length - 1,
                  )}`,
                });
              }
            });
          });
        }
      }
    }

    const finalResultsWithoutDeletedAt = finalResults.map((result) => ({
      ...result,
      deletedAt: null,
    }));

    return this.tournamentResultRepository.save(finalResultsWithoutDeletedAt);
  }

  private async fetchResultsForStageRankingPlusParallelOnes(
    stage: Stage,
    allStages: Stage[],
    processedStages: number[],
  ): Promise<PlayerResultsWithPast[][]> {
    const idsToFetch = this.getStageIdsToFetch(stage, allStages);
    const resultsFromAllRelatedStages = await Promise.all(
      idsToFetch.map((id) =>
        this.roundResultsService.overviewResultsByStage(id),
      ),
    );
    processedStages.push(...idsToFetch);
    return resultsFromAllRelatedStages;
  }

  private async fetchResultsForStageGroupPlusParallelOnes(
    stage: Stage,
    allStages: Stage[],
    processedStages: number[],
  ): Promise<LobbyGroupWithLobbies> {
    const idsToFetch = this.getStageIdsToFetch(stage, allStages);
    const resultsFromAllRelatedStages = await Promise.all(
      idsToFetch.map((id) => this.roundResultsService.lobbyResultsByStage(id)),
    );
    processedStages.push(...idsToFetch);
    const flatResults = resultsFromAllRelatedStages.flat();
    return flatResults.reduce<LobbyGroupWithLobbies>(
      (prev, curr) => ({
        ...prev,
        lobbies: [...(prev.lobbies || []), ...curr.lobbies],
      }),
      {} as LobbyGroupWithLobbies,
    );
  }

  private getStageIdsToFetch(stage: Stage, allStages: Stage[]) {
    const { id, sequenceForResult } = stage;
    const stagesWithSameSequence = allStages.filter(
      (s) => s.sequenceForResult === sequenceForResult && s.id !== id,
    );
    const idsToFetch = [id, ...stagesWithSameSequence.map((s) => s.id)];
    return idsToFetch;
  }

  async deleteResults(tournamentId: number): Promise<DeleteResponse> {
    await this.tournamentResultRepository.softDelete({ tournamentId });
    return { id: tournamentId };
  }

  async updatePlayer(
    fromPlayerId: number,
    toPlayerId: number,
  ): Promise<UpdateResult> {
    return this.tournamentResultRepository.update(
      { playerId: fromPlayerId },
      { playerId: toPlayerId },
    );
  }
}
