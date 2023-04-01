import { gql } from "urql";
import { TournamentStream } from "../../../../graphql/schema";

export interface TournamentStreamQueryResponse {
  streamsOfTournament: TournamentStream[];
}

export const TOURNAMENT_STREAM_QUERY = gql`
  query streams($tournamentId: Int!) {
    streamsOfTournament(tournamentId: $tournamentId) {
      tournamentId
      name
      link
      platform
      language
      isLive
    }
  }
`;

export interface TournamentVodsQueryResponse {
  vodsOfTournament: TournamentStream[];
}

export const TOURNAMENT_VODS_QUERY = gql`
  query streams($tournamentId: Int!) {
    vodsOfTournament(tournamentId: $tournamentId) {
      tournamentId
      name
      link
      platform
      language
    }
  }
`;
