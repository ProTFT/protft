import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class UpdatePlayerArgs {
  @Field(() => Int, { name: "id" })
  id: number;

  @Field({ name: "name", nullable: true })
  name?: string;

  @Field({ name: "country", nullable: true })
  country?: string;

  @Field({ name: "region", nullable: true })
  region?: string;

  @Field({ name: "slug", nullable: true })
  slug?: string;
}
