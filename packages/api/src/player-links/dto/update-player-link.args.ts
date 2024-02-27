import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class UpdatePlayerLinkArgs {
  @Field(() => Int, { name: "id" })
  id: number;

  @Field({ name: "type", nullable: true })
  type?: string;

  @Field({ name: "link", nullable: true })
  link?: string;
}
