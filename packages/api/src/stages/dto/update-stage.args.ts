import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class UpdateStageArgs {
  @Field(() => Int, { name: "id" })
  id: number;

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

  @Field(() => Int, { name: "roundCount" })
  roundCount: number;

  @Field(() => [Int], { name: "tiebreakers", nullable: true })
  tiebreakers: number[];

  @Field({ name: "description", nullable: true })
  description?: string;
}
