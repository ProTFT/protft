import { Field, InputType, Int, ObjectType, OmitType } from "@nestjs/graphql";
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
import { RoundInput } from "./round.entity";
import { RoundResult } from "./round-result.entity";

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

  @Field()
  @Column()
  stageId: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  sequence: number;

  @Field()
  roundCount: number;

  @Field(() => [PlayerLobbyResult], { nullable: true })
  playersResults: PlayerLobbyResult[];

  @Field(() => [Player])
  @ManyToMany(() => Player, { cascade: true })
  @JoinTable()
  players: Player[];

  @ManyToOne(() => Stage, (stage) => stage.id)
  stage: Stage;

  @OneToMany(() => RoundResult, (roundResult) => roundResult.lobbyId)
  roundResults: RoundResult[];
}

@InputType()
export class LobbyInput extends OmitType(
  Lobby,
  ["id", "players", "playersResults", "stage", "stageId"] as const,
  InputType,
) {
  @Field(() => [RoundInput])
  rounds: RoundInput[];

  @Field(() => [PlayerInput])
  players: PlayerInput[];
}

@InputType()
export class PlayerInput {
  @Field()
  id: number;
}
