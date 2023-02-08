import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Round } from "../rounds/round.entity";
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class RoundResult {
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
