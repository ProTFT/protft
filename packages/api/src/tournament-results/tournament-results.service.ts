import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoundResultsService } from "../round-results/round-results.service";
import { StagesService } from "../stages/stages.service";
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

    const allResults = await Promise.all(
      tournamentStages.map((stage) =>
        this.roundResultsService.resultsByStage(stage.id),
      ),
    );

    const sortedResults = allResults.reverse();
    const finalResults: Pick<
      TournamentResult,
      "tournamentId" | "finalPosition" | "playerId"
    >[] = [];
    sortedResults.forEach((stage) => {
      stage.slice(finalResults.length).forEach((playersInStage) => {
        finalResults.push({
          tournamentId,
          finalPosition: finalResults.length + 1,
          playerId: playersInStage.player.id,
        });
      });
    });
    return this.tournamentResultRepository.save(finalResults);
  }
}
