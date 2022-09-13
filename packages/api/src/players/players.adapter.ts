import { PlayerStatsRaw } from "../round-results/dto/get-player-stats.raw";
import { PlayerStats } from "./dto/get-player-stats.out";

export function formatStats({
  averagePosition,
  eigthCount,
  topFourCount,
  topOneCount,
  totalGames,
}: PlayerStatsRaw): PlayerStats {
  return {
    eigthCount: getPercentage(eigthCount, totalGames),
    topFourCount: getPercentage(topFourCount, totalGames),
    topOneCount: getPercentage(topOneCount, totalGames),
    totalGames: Number(totalGames),
    averagePosition: Number(parseFloat(averagePosition).toFixed(2)),
  };
}

function getPercentage(stat: string, total: string): number {
  const statNumber = parseFloat(stat);
  const totalNumber = parseFloat(total || "0");
  return Number(((statNumber / totalNumber) * 100).toFixed(2));
}
