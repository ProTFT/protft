import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Stage } from "../stages/stage.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../lib/BaseEntity";
import { Tournament } from "../tournaments/entities/tournament.entity";

@ObjectType()
@Entity()
@Index(["tournamentId", "stageId", "sequence"], {
  unique: true,
  where: '"deletedAt" is null',
})
export class Qualification extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  tournamentId: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  stageId: number;

  @Field(() => Int)
  @Column()
  sequence: number;

  @Field(() => Int)
  @Column()
  startPosition: number;

  @Field(() => Int)
  @Column()
  finalPosition: number;

  @Field(() => Int)
  @Column()
  qualifyToTournamentId: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  qualifyToStageId: number;

  // @Field(() => Int)
  // @Column({ default: 0 })
  // bonusPoints: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.id, {
    onDelete: "CASCADE",
  })
  tournament: Tournament;

  @ManyToOne(() => Stage, (stage) => stage.id, {
    onDelete: "CASCADE",
  })
  stage: Stage;

  @ManyToOne(() => Tournament, (tournament) => tournament.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "qualifyToTournamentId" })
  tournamentToQualify: Tournament;

  @ManyToOne(() => Stage, (stage) => stage.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "qualifyToStageId" })
  stageToQualify: Stage;
}
