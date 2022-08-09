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
import { RoundResult } from "../round-results/round-result.entity";
import { PlayerResults } from "../round-results/dto/get-results.out";

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

  @Field(() => [PlayerResults], { nullable: true })
  playersResults?: PlayerResults[];

  @Field(() => [Player], { nullable: true })
  @ManyToMany(() => Player, { cascade: true })
  @JoinTable()
  players?: Player[];

  @ManyToOne(() => Stage, (stage) => stage.id)
  stage: Stage;

  @OneToMany(() => RoundResult, (roundResult) => roundResult.lobbyId)
  roundResults?: RoundResult[];
}
