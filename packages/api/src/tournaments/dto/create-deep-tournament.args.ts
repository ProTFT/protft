import { Field, InputType, OmitType } from "@nestjs/graphql";
import { StageInput } from "../../stages/stage.entity";
import { Tournament } from "../tournament.entity";

@InputType()
export class DeepTournamentInput extends OmitType(
  Tournament,
  ["id", "set", "stages"] as const,
  InputType,
) {
  @Field(() => [StageInput])
  stages: StageInput[];
}
