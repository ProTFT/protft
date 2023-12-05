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
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";
import { LobbyGroup } from "./lobby-group.entity";
import { BaseEntity } from "../lib/BaseEntity";

@ObjectType()
@Entity()
@Index(["lobbyGroupId", "sequence"], {
  unique: true,
  where: '"deletedAt" is null',
})
export class Lobby extends BaseEntity {
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
  @OneToMany(() => LobbyPlayerInfo, (lobbyPlayer) => lobbyPlayer.lobby, {
    cascade: true,
  })
  players: LobbyPlayerInfo[];

  @ManyToOne(() => Stage, (stage) => stage.id, {
    onDelete: "CASCADE",
  })
  stage: Stage;

  @ManyToOne(() => LobbyGroup, (lobbyGroup) => lobbyGroup.id, {
    onDelete: "CASCADE",
  })
  lobbyGroup: LobbyGroup;
}
