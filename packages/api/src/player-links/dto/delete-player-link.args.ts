import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class DeletePlayerLinkArgs {
  @Field(() => Int, { name: "id" })
  id: number;
}
