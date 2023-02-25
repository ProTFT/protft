import { Tournament } from "../../tournaments/tournament.entity";

export interface TournamentsPlayedRaw extends Tournament {
  setId: number;
  setName: string;
  finalPosition?: number;
}
