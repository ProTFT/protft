export interface PlayerStatsRaw {
  averagePosition: string;
  totalGames: string;
  topFourCount: string;
  topOneCount: string;
  eigthCount: string;
}

export interface PlayersStatsRaw extends PlayerStatsRaw {
  id: number;
  name: string;
  region: string;
  country: string;
}
