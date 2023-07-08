import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import Joi from "joi";
import { RegionCode } from "./region.types";

export class CreateTournamentSchemaDto {
  @ApiProperty({ example: "Golden Spatula Cup #1" })
  name: string;

  @ApiProperty({ example: 9 })
  setId: number;

  @ApiPropertyOptional({ enum: RegionCode, isArray: true })
  region?: string[];

  @ApiPropertyOptional({ example: "Riot Games" })
  host?: string;

  @ApiPropertyOptional({ example: 128 })
  participantsNumber?: number;

  @ApiPropertyOptional({ example: 10000 })
  prizePool?: number;

  @ApiPropertyOptional({ example: "EUR" })
  currency?: string;

  @ApiPropertyOptional()
  startDate?: Date;

  @ApiPropertyOptional()
  endDate?: Date;
}

export const CreateTournamentSchema = Joi.object({
  name: Joi.string().required(),
  setId: Joi.number().required(),
  region: Joi.array().items(Joi.string().valid(...Object.values(RegionCode))),
  host: Joi.string(),
  participantsNumber: Joi.number(),
  prizePool: Joi.number(),
  currency: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
});
