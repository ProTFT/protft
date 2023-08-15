export enum TrackingEvents {
  TOURNAMENT_STAGE_OPEN = "tournament_stage_open",
  FEEDBACK_CLICK = "feedback_click",
  APPLY_FILTER = "apply_filter",
}

type TournamentStageOpenProps = {
  readonly tournamentId: number;
  readonly tournamentName: string;
  readonly stageId: number;
  readonly stageName: string;
} & { [prop: string]: string | number };

type FeedbackClickProps = {
  readonly page: string;
};

type ApplyFilterProps = {
  readonly filters: string;
};

export interface TrackingEventTypeMap {
  [TrackingEvents.TOURNAMENT_STAGE_OPEN]: TournamentStageOpenProps;
  [TrackingEvents.FEEDBACK_CLICK]: FeedbackClickProps;
  [TrackingEvents.APPLY_FILTER]: ApplyFilterProps;
}
