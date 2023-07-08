import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { DeleteResponse } from "../lib/dto/delete-return";
import { getOrdinal } from "../lib/Number";
import { RoundResultsService } from "../round-results/round-results.service";
import { PLAYERS_IN_TFT_LOBBY, StagesService } from "../stages/stages.service";
import { StageType } from "../stages/types/StageType";
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

    const finalResults: Pick<
      TournamentResult,
      "tournamentId" | "finalPosition" | "playerId"
    >[] = [];

    const arrayOfLobbyPlayers = new Array(PLAYERS_IN_TFT_LOBBY).fill(0);

    for (const stage of tournamentStages.reverse()) {
      if (stage.stageType === StageType.RANKING) {
        const results = await this.roundResultsService.overviewResultsByStage(
          stage.id,
        );

        results
          .filter(
            (result) =>
              !finalResults.find((fr) => fr.playerId === result.player.id),
          )
          .forEach((playersInStage) => {
            finalResults.push({
              tournamentId,
              finalPosition: getOrdinal(finalResults.length + 1),
              playerId: playersInStage.player.id,
            });
          });
      }

      if (stage.stageType === StageType.GROUP_BASED) {
        const results = await this.roundResultsService.lobbyResultsByStage(
          stage.id,
        );

        for (const lobbyGroup of results) {
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

    return this.tournamentResultRepository.save(finalResults);
  }

  async deleteResults(tournamentId: number): Promise<DeleteResponse> {
    await this.tournamentResultRepository.delete({ tournamentId });
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
