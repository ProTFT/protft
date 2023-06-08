export enum TrackingEvents {
  TOURNAMENT_STAGE_OPEN = "tournament_stage_open",
}

type TournamentStageOpenProps = {
  readonly tournamentId: number;
  readonly tournamentName: string;
  readonly stageId: number;
  readonly stageName: string;
} & { [prop: string]: string | number };

export interface TrackingEventTypeMap {
  [TrackingEvents.TOURNAMENT_STAGE_OPEN]: TournamentStageOpenProps;
}
