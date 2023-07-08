import { ArgsType, Field, Int } from "@nestjs/graphql";
import { StageType } from "../types/StageType";

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

  @Field(() => StageType, { name: "stageType" })
  stageType: StageType;

  @Field(() => Int, { name: "roundCount" })
  roundCount: number;

  @Field(() => Int, { name: "qualifiedCount", nullable: true, defaultValue: 0 })
  qualifiedCount?: number;

  @Field(() => [Int], { name: "tiebreakers", nullable: true })
  tiebreakers?: number[];

  @Field({ name: "description", nullable: true })
  description?: string;

  @Field({ name: "startDateTime", nullable: true })
  startDateTime?: string;
}
