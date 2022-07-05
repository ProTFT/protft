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

  @Field()
  @Column()
  sequence: number;

  @Field()
  @Column()
  isFinal: boolean;

  @Field()
  @Column()
  tournamentId: number;

  @Field()
  @Column()
  pointSchemaId: number;

  @Field(() => [Lobby], { nullable: true })
  @OneToMany(() => Lobby, (lobby) => lobby.stageId)
  lobbies: Lobby[];

  @ManyToOne(() => Tournament)
  @JoinColumn({ name: "tournamentId" })
  tournament: Tournament;

  @JoinColumn({ name: "pointSchemaId" })
  pointSchema: PointSchema;
}
