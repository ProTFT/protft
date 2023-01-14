import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Stage } from "../stages/stage.entity";
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
@Index(["stageId", "sequence"], { unique: true })
export class LobbyGroup {
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

  @ManyToOne(() => Stage, (stage) => stage.id, { onDelete: "CASCADE" })
  stage: Stage;
}
