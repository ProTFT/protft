import { PlayerStatsRaw } from "../round-results/dto/get-player-stats.raw";
import { PlayerStats } from "./dto/get-player-stats.out";

export function formatStats({
  averagePosition,
  eigthPercent,
  topFourPercent,
  topOnePercent,
  totalGames,
}: PlayerStatsRaw): PlayerStats {
  debugger;
  return {
    eigthCount: getPercentage(eigthPercent),
    topFourCount: getPercentage(topFourPercent),
    topOneCount: getPercentage(topOnePercent),
    totalGames: Number(totalGames),
    averagePosition: Number(parseFloat(averagePosition).toFixed(2)),
  };
}

function getPercentage(stat: string): number {
  const statNumber = parseFloat(stat);
  return Number((statNumber * 100).toFixed(2)) || 0;
}
