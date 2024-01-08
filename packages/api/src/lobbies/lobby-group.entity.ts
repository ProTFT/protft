import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Stage } from "../stages/stage.entity";
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../lib/BaseEntity";
import { Lobby } from "./lobby.entity";

@ObjectType()
@Entity()
@Index(["stageId", "sequence"], { unique: true, where: '"deletedAt" is null' })
export class LobbyGroup extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  stageId: number;

  @Field(() => Int)
  @Column()
  sequence: number;

  @Field(() => Int)
  @Column()
  roundsPlayed: number;

  @OneToMany(() => Lobby, (lobby) => lobby.lobbyGroup, {
    cascade: true,
    onDelete: "CASCADE",
  })
  lobbies: Lobby[];

  @ManyToOne(() => Stage, (stage) => stage.id, { onDelete: "CASCADE" })
  stage: Stage;
}
