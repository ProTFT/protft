import Joi from "joi";
import { ApiProperty } from "@nestjs/swagger";
import { buildValidator } from "../../lib/joi/validation.interceptor";

export class CreateServerSchemaDto {
  @ApiProperty({ example: "Europe West" })
  name: string;

  @ApiProperty({ example: "EUW" })
  code: string;

  @ApiProperty({ example: "?" })
  apiMinorRegion: string;

  @ApiProperty({ example: "?" })
  apiMajorRegion: string;
}

export const CreateServerSchema = buildValidator({
  body: Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    apiMinorRegion: Joi.string().required(),
    apiMajorRegion: Joi.string().required(),
  }),
});
