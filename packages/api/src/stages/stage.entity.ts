import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasePlayer, Lobby } from "../lobbies/lobby.entity";
import { Round } from "../lobbies/round.entity";
import { PointSchema } from "../points/point.entity";
import { Tournament } from "../tournaments/tournament.entity";

// vai morrer
@ObjectType()
export class PlayerStageResult {
  @Field(() => BasePlayer)
  player: BasePlayer;

  @Field(() => [Int])
  positions: number[];

  @Field(() => [Int])
  points: number[];
}

@ObjectType()
@Entity()
@Index(["tournamentId", "sequence"], { unique: true })
export class Stage {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  sequence: number;

  @Field()
  @Column({ default: false })
  isFinal: boolean;

  @Field(() => Int)
  @Column()
  tournamentId: number;

  @Field(() => Int)
  @Column()
  pointSchemaId: number;

  @Field(() => [PlayerStageResult], { nullable: true })
  playersResults?: PlayerStageResult[];

  @Field(() => Int)
  roundCount: number;

  @Field(() => [Lobby], { nullable: true })
  @OneToMany(() => Lobby, (lobby) => lobby.stage, {
    cascade: true,
  })
  lobbies?: Lobby[];

  @Field(() => [Round], { nullable: true })
  @OneToMany(() => Round, (round) => round.stage, {
    cascade: true,
  })
  rounds?: Round[];

  @ManyToOne(() => Tournament, (tournament) => tournament.id)
  tournament: Tournament;

  @JoinColumn({ name: "pointSchemaId" })
  pointSchema: PointSchema;
}
