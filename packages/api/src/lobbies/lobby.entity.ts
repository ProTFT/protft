import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Player } from "../players/player.entity";
import { Stage } from "../stages/stage.entity";
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoundResult } from "./round-result.entity";
//vao morrer ambos
@ObjectType()
export class BasePlayer {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  region: string;

  @Field({ nullable: true })
  country: string;
}

@ObjectType()
export class PlayerLobbyResult {
  @Field(() => BasePlayer)
  player: BasePlayer;

  @Field(() => [Int])
  positions: number[];

  @Field(() => [Int])
  points: number[];
}

@ObjectType()
@Entity()
@Index(["stageId", "sequence"], { unique: true })
export class Lobby {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  stageId: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  sequence: number;

  @Field(() => Int)
  roundCount: number;

  @Field(() => [PlayerLobbyResult], { nullable: true })
  playersResults?: PlayerLobbyResult[];

  @Field(() => [Player], { nullable: true })
  @ManyToMany(() => Player, { cascade: true })
  @JoinTable()
  players?: Player[];

  @ManyToOne(() => Stage, (stage) => stage.id)
  stage: Stage;

  @OneToMany(() => RoundResult, (roundResult) => roundResult.lobbyId)
  roundResults?: RoundResult[];
}
