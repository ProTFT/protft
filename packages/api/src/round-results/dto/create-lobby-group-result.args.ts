import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";

@ArgsType()
export class CreateLobbyGroupResultArgs {
  @Field(() => Int, { name: "lobbyGroupId" })
  lobbyGroupId: number;

  @Field(() => [CreateLobbyGroupResults], { name: "results" })
  results: CreateLobbyGroupResults[];
}

@InputType()
export class CreateLobbyGroupResults {
  @Field(() => Int, { name: "lobbyPlayerId" })
  lobbyPlayerId: number;

  @Field(() => [Int], { name: "positions" })
  positions: number[];
}
