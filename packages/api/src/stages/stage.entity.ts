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
import { Lobby } from "../lobbies/lobby.entity";
import { Round } from "../rounds/round.entity";
import { PointSchema } from "../points/point.entity";
import { Tournament } from "../tournaments/tournament.entity";

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

  @Column("int", { nullable: true, array: true })
  tiebreakers?: number[];

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
