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
  ] as const,
  InputType,
) {
  @Field(() => [LobbyInput])
  lobbies: LobbyInput[];
}

@InputType()
export class LobbyInput extends OmitType(
  Lobby,
  ["id", "players", "stage", "stageId"] as const,
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

// this was not working
@InputType()
export class RoundInput {
  @Field()
  sequence: number;
}
