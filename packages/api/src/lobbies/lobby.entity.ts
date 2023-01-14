import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Player } from "../players/player.entity";
import { Stage } from "../stages/stage.entity";
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { RoundResult } from "../round-results/round-result.entity";
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";
import { LobbyGroup } from "./lobby-group.entity";

@ObjectType()
@Entity()
@Index(["lobbyGroupId", "sequence"], { unique: true })
export class Lobby {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  stageId: number;

  @Column({ nullable: true })
  lobbyGroupId: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  sequence: number;

  @Field(() => [Player])
  @OneToMany(() => LobbyPlayerInfo, (lobbyPlayer) => lobbyPlayer.lobby)
  players: LobbyPlayerInfo[];

  @ManyToOne(() => Stage, (stage) => stage.id, {
    onDelete: "CASCADE",
  })
  stage: Stage;

  @ManyToOne(() => LobbyGroup, (lobbyGroup) => lobbyGroup.id, {
    onDelete: "CASCADE",
  })
  lobbyGroup: LobbyGroup;

  // @OneToMany(() => RoundResult, (roundResult) => roundResult.lobbyId)
  // roundResults?: RoundResult[];
}
