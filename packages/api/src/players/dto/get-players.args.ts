import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class GetPlayerArgs {
  @Field({ name: "region", nullable: true })
  region?: string;

  @Field({ name: "country", nullable: true })
  country?: string;
}
