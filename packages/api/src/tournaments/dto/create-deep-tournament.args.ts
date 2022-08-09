import { Field, InputType, OmitType } from "@nestjs/graphql";
import { LobbyInput } from "../../lobbies/lobby.entity";
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
