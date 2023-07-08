import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import Joi from "joi";
import { buildValidator } from "../../lib/joi/validation.interceptor";
import { RegionCode } from "../../tournaments/schema/region.types";

export class CreatePlayerBodySchemaDto {
  @ApiProperty({ example: "KC Double61" })
  name: string;

  @ApiProperty({ example: "FRA", description: "3-digit ISO Code for country" })
  country: string;

  @ApiProperty({ enum: RegionCode })
  region: string;

  @ApiPropertyOptional()
  alias?: string[];
}

export const CreatePlayerSchema = buildValidator({
  body: Joi.object({
    name: Joi.string().required(),
    country: Joi.string().required(),
    region: Joi.string()
      .valid(...Object.values(RegionCode))
      .required(),
    alias: Joi.array().items(Joi.string()),
  }),
});
