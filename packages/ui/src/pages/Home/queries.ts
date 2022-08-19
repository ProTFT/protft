import { gql } from "urql";
import { TournamentOverview } from "../../graphql/schema";

export interface TournamentOverviewResult {
  tournamentOverview: TournamentOverview;
}

export const TOURNAMENTS_OVERVIEW_QUERY = gql`
  query tournamentOverview {
    tournamentOverview {
      pastTournaments {
        id
        name
        startDate
        endDate
        region
      }
      liveTournaments {
        id
        name
        startDate
        endDate
        region
      }
      upcomingTournaments {
        id
        name
        startDate
        endDate
        region
      }
    }
  }
`;
