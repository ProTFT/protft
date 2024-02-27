import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import Joi from "joi";
import { buildValidator } from "../../lib/joi/validation.interceptor";
import { SortingMethods } from "../../round-results/round-result.logic";
import { tiebreakerMap } from "../../stages/tiebreaker.logic";
import { StageType } from "../../stages/types/StageType";

const tiebreakersDescription = Object.values(tiebreakerMap)
  .map(({ id, description }) => `${id} - ${description}`)
  .join("\n");

export class CreateTournamentStageBodySchemaDto {
  @ApiProperty({ example: 1 })
  pointSchemaId: number;

  @ApiProperty({ example: "Day 1" })
  name: string;

  @ApiProperty({ example: 1, description: "Starting by 1" })
  sequence: number;

  @ApiProperty({ enum: StageType })
  stageType: StageType;

  @ApiProperty({ example: 6 })
  roundCount: number;

  @ApiPropertyOptional({ example: 64 })
  qualifiedCount?: number;

  @ApiPropertyOptional({
    enum: SortingMethods,
    isArray: true,
    description: tiebreakersDescription,
  })
  tiebreakers: number[];

  @ApiPropertyOptional({ example: "Round of 128" })
  description?: string;

  @ApiPropertyOptional()
  startDateTime?: string;
}

export class CreateTournamentStageParamsSchemaDto {
  @ApiProperty()
  tournamentId: number;
}

export const CreateTournamentStageSchema = buildValidator({
  params: Joi.object({
    tournamentId: Joi.number().required(),
  }),
  body: Joi.object({
    pointSchemaId: Joi.number().required(),
    name: Joi.string().required(),
    sequence: Joi.number().required(),
    stageType: Joi.string()
      .valid(...Object.values(StageType))
      .required(),
    roundCount: Joi.number().required(),
    qualifiedCount: Joi.number(),
    tiebreakers: Joi.array().items(Joi.number()),
    description: Joi.string(),
    startDateTime: Joi.date(),
  }),
});
