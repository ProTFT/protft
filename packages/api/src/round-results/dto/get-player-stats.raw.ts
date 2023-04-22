export interface PlayerStatsRaw {
  averagePosition: string;
  totalGames: string;
  topFourPercent: string;
  topOnePercent: string;
  eigthPercent: string;
}

export interface PlayersStatsRaw extends PlayerStatsRaw {
  id: number;
  name: string;
  region: string;
  country: string;
  slug: string;
  alias: string[];
}
