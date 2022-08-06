import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoundResult } from "./round-result.entity";
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
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
  roundResults: RoundResult[];

  @ManyToOne(() => Stage, (stage) => stage.id)
  stage: Stage;
}

@InputType() // pq ele não salva isso? Precisa que o Round seja um object type? não faz sentido por ser banco <> graphql
export class RoundInput {
  @Field()
  sequence: number;
}
