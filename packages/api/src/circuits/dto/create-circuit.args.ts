import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CreateCircuitArgs {
  @Field({ name: "name" })
  name: string;

  @Field({ name: "setId" })
  setId: number;

  @Field(() => [String], { name: "region" })
  region: string[];
}
