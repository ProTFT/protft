import { Tournament } from "../../tournaments/entities/tournament.entity";

export interface TournamentsPlayedRaw extends Tournament {
  setId: number;
  setName: string;
  finalPosition?: string;
}
