import { Injectable } from "@nestjs/common";
import { PlayerResults } from "./dto/get-results.out";
import { RoundResultsRaw } from "./dto/get-results.raw";
import { fromRawToConsolidatedRoundResults } from "./round-result.adapter";
import { SortingMethods, sortResults } from "./round-result.logic";
import { RoundResultsService } from "./round-results.service";

@Injectable()
export class RoundResultsFacade {
  constructor(private roundResultsService: RoundResultsService) {}

  async findResultsByLobby(lobbyId: number) {
    const results = await this.roundResultsService.findResultsByLobby(lobbyId);
    return this.formatAndSort(results);
  }

  async findResultsByStage(stageId: number) {
    const results = await this.roundResultsService.findResultsByStage(stageId);
    return this.formatAndSort(results);
  }

  private formatAndSort(results: RoundResultsRaw[]): PlayerResults[] {
    const formattedResults = fromRawToConsolidatedRoundResults(results);
    const tiebreakerMethods = [
      SortingMethods.POINTS,
      SortingMethods.FIRST_PLACES,
      SortingMethods.TOP_FOURS,
      SortingMethods.LAST_ROUND_POSITION,
    ];
    return sortResults(formattedResults, tiebreakerMethods);
  }
}
