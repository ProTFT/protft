import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreateStageArgs {
  @Field(() => Int, { name: "tournamentId" })
  tournamentId: number;

  @Field(() => Int, { name: "pointSchemaId" })
  pointSchemaId: number;

  @Field({ name: "name" })
  name: string;

  @Field(() => Int, { name: "sequence" })
  sequence: number;

  @Field({ name: "isFinal" })
  isFinal: boolean;
}
