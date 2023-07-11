import { ApiProperty } from "@nestjs/swagger";
import Joi from "joi";
import { buildValidator } from "../../lib/joi/validation.interceptor";

export class GenerateLobbiesParamsSchemaDto {
  @ApiProperty({ example: 2 })
  stageId: number;
}

export class GenerateLobbiesBodySchemaDto {
  @ApiProperty({ example: 2 })
  roundsUntilReseed: number;
}

export const GenerateLobbiesSchema = buildValidator({
  params: Joi.object({
    stageId: Joi.number().required(),
  }),
  body: Joi.object({
    roundsUntilReseed: Joi.number().required(),
  }),
});
