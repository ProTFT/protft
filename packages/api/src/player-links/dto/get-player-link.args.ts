import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class GetPlayerLinkArgs {
  @Field(() => Int, { name: "id" })
  id: number;
}
