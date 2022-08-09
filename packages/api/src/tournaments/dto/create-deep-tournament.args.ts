import { Field, InputType, OmitType } from "@nestjs/graphql";
import { Lobby } from "../../lobbies/lobby.entity";
import { Stage } from "../../stages/stage.entity";
import { Tournament } from "../tournament.entity";

@InputType()
export class DeepTournamentInput extends OmitType(
  Tournament,
  ["id", "set", "stages"] as const,
  InputType,
) {
  @Field(() => [StageInput])
  stages: StageInput[];
}

@InputType()
export class StageInput extends OmitType(
  Stage,
  [
    "id",
    "lobbies",
    "rounds",
    "pointSchema",
    "tournament",
    "tournamentId",
    "playersResults",
    "roundCount",
  ] as const,
  InputType,
) {
  @Field(() => [LobbyInput])
  lobbies: LobbyInput[];
}

@InputType()
export class LobbyInput extends OmitType(
  Lobby,
  ["id", "players", "playersResults", "stage", "stageId"] as const,
  InputType,
) {
  @Field(() => [RoundInput])
  rounds: RoundInput[];

  @Field(() => [PlayerInput])
  players: PlayerInput[];
}

@InputType()
export class PlayerInput {
  @Field()
  id: number;
}

@InputType() // pq ele não salva isso? Precisa que o Round seja um object type? não faz sentido por ser banco <> graphql
export class RoundInput {
  @Field()
  sequence: number;
}
