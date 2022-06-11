import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Player } from "../players/player.entity";
import { Stage } from "../stages/stage.entity";
import { Tournament } from "../tournaments/tournament.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Round } from "./round.entity";

@ObjectType()
export class PlayerLobbyResult {
  @Field(() => Player)
  player: Player;

  @Field(() => [Int])
  positions: number[];

  @Field(() => [Int])
  points: number[];
}

@ObjectType()
@Entity()
@Index(["tournamentId", "stageId", "sequence"], { unique: true })
export class Lobby {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  tournamentId: number;

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

  @OneToMany(() => Round, (round) => round.lobbyId)
  rounds: Round[];

  @ManyToOne(() => Tournament)
  @JoinColumn({ name: "tournamentId" })
  tournament: Tournament;

  @ManyToOne(() => Stage)
  @JoinColumn({ name: "stageId" })
  stage: Stage;
}
