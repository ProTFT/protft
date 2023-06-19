import { graphql } from "../../../../gql";
import { TournamentStream } from "../../../../graphql/schema";

export interface TournamentStreamQueryResponse {
  streamsOfTournament: TournamentStream[];
}

export const TOURNAMENT_STREAM_QUERY = graphql(`
  query streams($tournamentId: Int!) {
    streamsOfTournament(tournamentId: $tournamentId) {
      tournamentId
      name
      link
      platform
      language
      isLive
      isVOD
    }
  }
`);
