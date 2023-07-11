import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Tournament } from "./tournament.entity";
import { Server } from "../../servers/server.entity";

export enum EmbedStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

@Entity()
export class TournamentMetadata {
  @PrimaryColumn()
  tournamentId: number;

  @Column()
  title: string;

  @Column()
  roleName: string;

  @Column()
  roleId: number;

  @Column({ nullable: true })
  waitlistRoleId: number;

  @Column({ nullable: true })
  titleLink: string;

  @Column({ nullable: true })
  registrationRules: string;

  @Column({ nullable: true })
  color: string;

  @Column({ default: false })
  hasRegistrationStarted: boolean;

  @Column({ default: false })
  hasRegistrationEnded: boolean;

  @Column()
  registrationOpen: Date;

  @Column()
  registrationClose: Date;

  @Column({ nullable: true })
  discordChannelId: number;

  @Column({ nullable: true })
  discordMessageId: number;

  @Column({ nullable: true })
  checkinChannelId: number;

  @Column({ enum: EmbedStatus, default: EmbedStatus.ACTIVE })
  embedStatus: EmbedStatus;

  @Column({ default: false })
  embedUpdate: boolean;

  @Column()
  serverId: number;

  @Column()
  spreadsheetId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Tournament, (tournament) => tournament.id)
  @JoinColumn({ name: "tournamentId" })
  tournament: Tournament;

  @ManyToOne(() => Server, (server) => server.id)
  server: Server;
}
