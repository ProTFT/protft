import { EmbedStatus } from "../entities/tournament-metadata.entity";

export interface CreateTournamentMetadataDto {
  title: string;
  roleName: string;
  roleId: number;
  registrationOpen: Date;
  registrationClose: Date;
  serverId: number;
  titleLink?: string;
  color?: string;
  registrationRules?: string;
  hasRegistrationStarted?: boolean;
  hasRegistrationEnded?: boolean;
  discordChannelId?: number;
  discordMessageId?: number;
  checkinChannelId?: number;
  embedStatus?: EmbedStatus;
  embedUpdate?: boolean;
  spreadsheetId?: string;
  waitlistRoleId?: number;
}

export interface CreateTournamentDto {
  name: string;
  setId: number;
  slug: string;
  region?: string[];
  host?: string;
  participantsNumber?: number;
  prizePool?: number;
  currency?: string;
  startDate?: Date;
  endDate?: Date;
  visibility?: boolean;
  isAmateur?: boolean;
  description?: string;
  image?: string;
  metadata?: CreateTournamentMetadataDto;
}
