import { PlayerStatsRaw } from "../round-results/dto/get-player-stats.raw";
import { PlayerCalculatedStats } from "./player.entity";

export function formatStats({
  averagePosition,
  eigthPercent,
  topFourPercent,
  topOnePercent,
  totalGames,
}: PlayerStatsRaw): PlayerCalculatedStats {
  return {
    eigthCount: getPercentage(eigthPercent),
    topFourCount: getPercentage(topFourPercent),
    topOneCount: getPercentage(topOnePercent),
    totalGames: formatInt(totalGames),
    averagePosition: formatFloat(averagePosition),
  };
}

function getPercentage(stat: string): number {
  const statNumber = parseFloat(stat);
  return Number((statNumber * 100).toFixed(2)) || 0;
}

function formatFloat(value: string) {
  const actualValue = parseFloat(value) || 0;
  return Number(actualValue.toFixed(2));
}

function formatInt(value: string) {
  const actualValue = Number(value) || 0;
  return Number(actualValue);
}
