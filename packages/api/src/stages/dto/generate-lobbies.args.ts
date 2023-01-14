import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class GenerateLobbiesArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;

  @Field(() => Int, { name: "roundsPerLobbyGroup" })
  roundsPerLobbyGroup: number;
}
