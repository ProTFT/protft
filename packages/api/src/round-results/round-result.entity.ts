import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Round } from "../rounds/round.entity";
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "../lib/BaseEntity";

@ObjectType()
@Entity()
@Index(["lobbyPlayerId"], { unique: false, where: `\"deletedAt\" is null` })
export class RoundResult extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  roundId: number;

  @Field(() => Int)
  @PrimaryColumn()
  lobbyPlayerId: number;

  @Field(() => Int)
  @Column()
  position: number;

  @ManyToOne(() => LobbyPlayerInfo, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "lobbyPlayerId" })
  lobbyPlayerInfo: LobbyPlayerInfo;

  @ManyToOne(() => Round, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "roundId" })
  round: Round;
}
