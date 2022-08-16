import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CreatePlayerArgs {
  @Field({ name: "name" })
  name: string;

  @Field({ name: "country" })
  country: string;

  @Field({ name: "region" })
  region: string;
}
