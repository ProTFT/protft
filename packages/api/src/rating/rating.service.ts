import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import groupBy from "lodash.groupby";
import { rate, rating } from "openskill";
import { Repository } from "typeorm";
import { TournamentsService } from "../tournaments/tournaments.service";
import { PlayerRating } from "./rating.entity";

interface RawTournamentResults {
  Lobby: number;
  Round: number;
  Player: number;
  Position: number;
}

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(PlayerRating)
    private playerRatingRepository: Repository<PlayerRating>,
    private tournamentsService: TournamentsService,
  ) {}

  public async getEloChange(tournamentId: number): Promise<any> {
    const ratingId = 3;
    const tournamentWithPlayers = await this.tournamentsService.findOne(
      tournamentId,
      ["players"],
    );
    const tournamentPlayers = tournamentWithPlayers.players;
    const playerWithRatings = new Map<number, ReturnType<typeof rating>>();

    await Promise.all(
      tournamentPlayers.map(async (player) => {
        const { currentMu, currentSigma } = await this.getOrCreatePlayerEntry(
          player.id,
          ratingId,
        );
        playerWithRatings.set(
          player.id,
          rating({
            mu: Number(Number(currentMu).toFixed(5)),
            sigma: Number(Number(currentSigma).toFixed(5)),
          }),
        );
      }),
    );

    const initialScores = new Map<number, number>();
    Array.from(playerWithRatings.entries()).map(([playerId, rating]) =>
      initialScores.set(playerId, this.fromRatingToScore(rating)),
    );

    const tournamentResults = await this.getTournamentResults(tournamentId);
    const groupedResults = groupBy(
      tournamentResults,
      (item) => `${item.Lobby}-${item.Round}`,
    );

    Object.values(groupedResults).forEach((lobbyRoundResult) => {
      const playerCurrentRates = lobbyRoundResult.map((roundResult) =>
        playerWithRatings.get(roundResult.Player),
      );
      const splitPlayerRates = playerCurrentRates.map((r) => [r]);
      const newRatings = rate(splitPlayerRates);
      lobbyRoundResult.map(({ Player }, index) =>
        playerWithRatings.set(Player, newRatings[index][0]),
      );
    });

    const newScores = new Map<number, number>();
    Array.from(playerWithRatings.entries()).forEach(([playerId, rating]) =>
      newScores.set(playerId, this.fromRatingToScore(rating)),
    );

    const offsets = new Map<number, number>();
    Array.from(newScores.entries()).forEach(([playerId, newScore]) =>
      offsets.set(
        Number(playerId),
        newScore - initialScores.get(Number(playerId)),
      ),
    );

    const entries: Omit<
      PlayerRating,
      "player" | "tournament" | "rating" | "id"
    >[] = Array.from(playerWithRatings.entries()).map(
      ([playerId, newRating]) => ({
        playerId,
        currentMu: newRating.mu,
        currentSigma: newRating.sigma,
        currentRating: newScores.get(playerId),
        ratingId,
        ratingVariation: offsets.get(playerId),
        tournamentId,
      }),
    );

    await this.playerRatingRepository.save(entries);

    return { success: true };
  }

  public async getOrCreatePlayerEntry(
    playerId: number,
    ratingId: number,
  ): Promise<PlayerRating> {
    const playerRating = await this.playerRatingRepository.findOne({
      where: { playerId: playerId, ratingId },
      order: { id: "DESC" },
    });

    if (!playerRating) {
      const baseRating = rating();

      return this.playerRatingRepository.create({
        playerId,
        ratingId,
        tournamentId: 0,
        ratingVariation: 0,
        currentMu: baseRating.mu,
        currentSigma: baseRating.sigma,
        currentRating: this.fromRatingToScore(baseRating),
      });
    }

    return playerRating;
  }

  private fromRatingToScore(value: ReturnType<typeof rating>) {
    return 40 * (value.mu - 3 * value.sigma + 25);
  }

  private getTournamentResults(
    tournamentId: number,
  ): Promise<RawTournamentResults[]> {
    return this.playerRatingRepository.manager
      .createQueryBuilder()
      .select("l.id", "Lobby")
      .addSelect("r.id", "Round")
      .addSelect("lpi.playerId", "Player")
      .addSelect("rr.position", "Position")
      .from<RawTournamentResults>("stage", "s")
      .innerJoin("lobby", "l", "l.stageId = s.id")
      .innerJoin("lobby_player_info", "lpi", "lpi.lobbyId = l.id")
      .innerJoin("round", "r", "r.stageId = s.id")
      .innerJoin(
        "round_result",
        "rr",
        "rr.lobbyPlayerId = lpi.id AND rr.roundId = r.id",
      )
      .where("s.tournament = :tournamentId", { tournamentId })
      .andWhere("rr.position BETWEEN 1 AND 8")
      .orderBy("s.sequence", "ASC")
      .addOrderBy("l.sequence", "ASC")
      .addOrderBy("r.sequence", "ASC")
      .addOrderBy("rr.position", "ASC")
      .execute();
  }
}
