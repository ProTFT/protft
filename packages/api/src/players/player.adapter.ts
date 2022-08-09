import { PlayerStatsRaw } from "../round-results/dto/get-player-stats.raw";
import { PlayerStats } from "./dto/get-player-stats.out";

export function formatStats({
  eigthCount,
  topFourCount,
  topOneCount,
  totalGames,
  averagePosition,
}: PlayerStatsRaw): PlayerStats {
  return {
    eigthCount: Number(eigthCount),
    topFourCount: Number(topFourCount),
    topOneCount: Number(topOneCount),
    totalGames: Number(totalGames),
    averagePosition: Number(parseFloat(averagePosition).toFixed(2)),
  };
}
