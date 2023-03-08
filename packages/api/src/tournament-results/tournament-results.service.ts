import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { getOrdinal } from "../lib/Number";
import { RoundResultsService } from "../round-results/round-results.service";
import { StageType } from "../stages/stage.entity";
import { PLAYERS_IN_TFT_LOBBY, StagesService } from "../stages/stages.service";
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

    for (const stage of tournamentStages.reverse()) {
      if (stage.stageType === StageType.RANKING) {
        const results = await this.roundResultsService.overviewResultsByStage(
          stage.id,
        );

        results.slice(finalResults.length).forEach((playersInStage) => {
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
          new Array(PLAYERS_IN_TFT_LOBBY)
            .fill(0)
            .forEach((_, positionIndex) => {
              lobbies.forEach((lobby, _, allLobbies) => {
                const offset = positionIndex * allLobbies.length + 1;
                if (
                  !finalResults.find(
                    (result) =>
                      result.playerId ===
                      lobby.results[positionIndex].player.id,
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
}
