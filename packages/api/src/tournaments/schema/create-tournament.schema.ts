import Joi from "joi";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { buildValidator } from "../../lib/joi/validation.interceptor";
import { EmbedStatus } from "../entities/tournament-metadata.entity";
import { RegionCode } from "../types/region.types";

export class CreateTournamentMetadataSchemaDto {
  @ApiProperty({ example: "Mortdog Presents: TK Cup" })
  title: string;

  @ApiProperty({ example: "MortdogCup" })
  roleName: string;

  @ApiProperty({ example: 123 })
  roleId: number;

  @ApiProperty({ example: "2023-07-10T17:55:58.678Z" })
  registrationOpen: Date;

  @ApiProperty({ example: "2023-07-10T17:55:58.678Z" })
  registrationClose: Date;

  @ApiProperty({ example: 123 })
  serverId: number;

  @ApiPropertyOptional({ example: "www.protft.com/tournaments/123-tk-cup" })
  titleLink?: string;

  @ApiPropertyOptional({ example: "?" })
  color?: string;

  @ApiPropertyOptional({ example: "Text" })
  registrationRules?: string;

  @ApiPropertyOptional({ example: true, default: false })
  hasRegistrationStarted?: boolean;

  @ApiPropertyOptional({ example: true, default: false })
  hasRegistrationEnded?: boolean;

  @ApiPropertyOptional({ example: 123 })
  discordChannelId?: number;

  @ApiPropertyOptional({ example: 123 })
  discordMessageId?: number;

  @ApiPropertyOptional({ example: 123 })
  checkinChannelId?: number;

  @ApiPropertyOptional({
    example: EmbedStatus.ACTIVE,
    default: EmbedStatus.ACTIVE,
    enum: EmbedStatus,
  })
  embedStatus?: EmbedStatus;

  @ApiPropertyOptional({ example: true, default: false })
  embedUpdate?: boolean;

  @ApiPropertyOptional({ example: "?" })
  spreadsheetId?: string;

  @ApiPropertyOptional({ example: 123 })
  waitlistRoleId?: number;
}

export class CreateTournamentSchemaDto {
  @ApiProperty({ example: "Golden Spatula Cup #1" })
  name: string;

  @ApiProperty({ example: 9 })
  setId: number;

  @ApiProperty({ example: "Text" })
  description: string;

  @ApiProperty({ enum: RegionCode, isArray: true })
  region: string[];

  @ApiPropertyOptional({ example: "?" })
  image?: string;

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

  @ApiPropertyOptional({ example: true, default: true })
  isAmateur?: boolean;

  @ApiProperty()
  metadata: CreateTournamentMetadataSchemaDto;
}

export const CreateTournamentSchema = buildValidator({
  body: Joi.object({
    name: Joi.string().required(),
    setId: Joi.number().required(),
    region: Joi.array().items(Joi.string().valid(...Object.values(RegionCode))),
    host: Joi.string(),
    participantsNumber: Joi.number(),
    prizePool: Joi.number(),
    currency: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    description: Joi.string().required(),
    image: Joi.string(),
    isAmateur: Joi.boolean().default(true),
    metadata: Joi.object({
      title: Joi.string().required(),
      roleName: Joi.string().required(),
      roleId: Joi.number().required(),
      registrationOpen: Joi.date().required(),
      registrationClose: Joi.date().required(),
      serverId: Joi.number().required(),
      waitlistRoleId: Joi.number(),
      titleLink: Joi.string(),
      color: Joi.string(),
      registrationRules: Joi.string(),
      hasRegistrationStarted: Joi.boolean().default(false),
      hasRegistrationEnded: Joi.boolean().default(false),
      discordChannelId: Joi.number(),
      discordMessageId: Joi.number(),
      checkinChannelId: Joi.number(),
      embedStatus: Joi.string()
        .valid(...Object.values(EmbedStatus))
        .default(EmbedStatus.ACTIVE),
      embedUpdate: Joi.boolean().default(false),
      spreadsheetId: Joi.string(),
    }),
  }),
});
