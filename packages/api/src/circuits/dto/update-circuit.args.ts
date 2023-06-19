import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UpdateCircuitArgs {
  @Field({ name: "id" })
  id: number;

  @Field({ name: "name", nullable: true })
  name?: string;

  @Field({ name: "setId", nullable: true })
  setId?: number;

  @Field(() => [String], { name: "region", nullable: true })
  region?: string[];
}
