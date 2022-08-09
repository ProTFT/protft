import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoundResult } from "../round-results/round-result.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Stage } from "../stages/stage.entity";

@Entity()
@ObjectType()
@Index(["stageId", "sequence"], { unique: true })
export class Round {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  stageId: number;

  @Field(() => Int)
  @Column()
  sequence: number;

  @OneToMany(() => RoundResult, (roundResult) => roundResult.roundId)
  roundResults?: RoundResult[];

  @ManyToOne(() => Stage, (stage) => stage.id)
  stage: Stage;
}
