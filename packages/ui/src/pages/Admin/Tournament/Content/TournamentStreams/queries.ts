import { gql } from "urql";
import { TournamentStream } from "../../../../../graphql/schema";

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
      isVOD
    }
  }
`;

export interface CreateStreamResult {
  addTournamentStream: {
    tournamentId: Pick<TournamentStream, "tournamentId">;
    name: Pick<TournamentStream, "name">;
  };
}

export type CreateStreamVariables = {
  tournamentId: number;
  name: string;
  link: string;
  platform: string;
  language: string;
  isLive: boolean;
};

export const ADD_STREAM_MUTATION = gql`
  mutation addTournamentStream(
    $tournamentId: Int!
    $name: String!
    $link: String!
    $platform: String!
    $language: String!
    $isLive: Boolean!
  ) {
    addTournamentStream(
      tournamentId: $tournamentId
      name: $name
      link: $link
      platform: $platform
      language: $language
      isLive: $isLive
    ) {
      tournamentId
      name
    }
  }
`;

export interface DeleteStreamResult {
  deleteTournamentStream: {
    id: number;
  };
}

export type DeleteStreamVariables = {
  tournamentId: number;
  name: string;
};

export const DELETE_STREAM_MUTATION = gql`
  mutation deleteTournamentStream($tournamentId: Int!, $name: String!) {
    deleteTournamentStream(tournamentId: $tournamentId, name: $name) {
      id
    }
  }
`;
