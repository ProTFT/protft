import { Field, InputType, Int, ObjectType, OmitType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lobby, LobbyInput } from "../lobbies/lobby.entity";
import { Round } from "../lobbies/round.entity";
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
  @OneToMany(() => Lobby, (lobby) => lobby.stage, {
    cascade: true,
  })
  lobbies: Lobby[];

  @Field(() => [Round], { nullable: true })
  @OneToMany(() => Round, (round) => round.stage, {
    cascade: true,
  })
  rounds: Round[];

  @ManyToOne(() => Tournament, (tournament) => tournament.id)
  tournament: Tournament;

  @JoinColumn({ name: "pointSchemaId" })
  pointSchema: PointSchema;
}

@InputType()
export class StageInput extends OmitType(
  Stage,
  [
    "id",
    "lobbies",
    "rounds",
    "pointSchema",
    "tournament",
    "tournamentId",
  ] as const,
  InputType,
) {
  @Field(() => [LobbyInput])
  lobbies: LobbyInput[];
}
