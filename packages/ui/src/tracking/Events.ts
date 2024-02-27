import { InputNames } from "../pages/Stats/Stats";

export enum TrackingEvents {
  TOURNAMENT_STAGE_OPEN = "tournament_stage_open",
  FEEDBACK_CLICK = "feedback_click",
  APPLY_FILTER = "apply_filter",
}

type TournamentStageOpenProps = {
  readonly tournamentStage: string;
};

type FeedbackClickProps = {
  readonly page: string;
};
type ApplyFilterProps = {
  readonly [InputNames.Set]: string;
  readonly [InputNames.Tournaments]: string;
  readonly [InputNames.PlayerRegion]: string;
  readonly [InputNames.MinimumGames]: string;
};

export interface TrackingEventTypeMap {
  [TrackingEvents.TOURNAMENT_STAGE_OPEN]: TournamentStageOpenProps;
  [TrackingEvents.FEEDBACK_CLICK]: FeedbackClickProps;
  [TrackingEvents.APPLY_FILTER]: ApplyFilterProps;
}
