export interface TournamentForm {
  name: string;
  host: string;
  region: string;
  participantsNumber: number;
  setId: number;
  prizePool: number;
  currency: string;
  startDate: Date;
  endDate: Date;
}
