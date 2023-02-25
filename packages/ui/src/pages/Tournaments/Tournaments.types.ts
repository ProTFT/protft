import { Tournament } from "../../graphql/schema";

export type TournamentWithMaybePlayerResult = Tournament & {
  finalPosition?: number | null;
};
