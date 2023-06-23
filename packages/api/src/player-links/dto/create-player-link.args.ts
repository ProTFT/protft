import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreatePlayerLinkArgs {
  @Field(() => Int, { name: "playerId" })
  playerId: number;

  @Field({ name: "type" })
  type: string;

  @Field({ name: "link" })
  link: string;
}
