import { ArgsType, Field, Int, registerEnumType } from "@nestjs/graphql";

export enum SnakeSeedType {
  SEEDING = "S",
  CURRENT_STAGE = "CS",
  LAST_STAGE = "LS",
}

registerEnumType(SnakeSeedType, { name: "SnakeSeedType" });

@ArgsType()
export class SnakeSeedArgs {
  @Field(() => Int, { name: "stageId" })
  stageId: number;

  @Field(() => Int, { name: "lobbyGroupId" })
  lobbyGroupId: number;

  @Field(() => SnakeSeedType, { name: "type" })
  type: SnakeSeedType;
}
