import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Tournament } from "../tournaments/tournament.entity";
import { Player } from "../players/player.entity";

@Entity()
@ObjectType()
export class TournamentResult {
  @Field(() => Int)
  @PrimaryColumn()
  tournamentId: number;

  @Field(() => Int)
  @PrimaryColumn()
  playerId: number;

  @Field()
  @Column()
  finalPosition: string;

  @Field(() => Int)
  @Column({ default: 0 })
  prize: number;

  @Field()
  @Column({ default: "" })
  otherRewards: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.id, {
    onDelete: "CASCADE",
  })
  tournament: Tournament;

  @ManyToOne(() => Player, (player) => player.id, {
    onDelete: "CASCADE",
  })
  player: Player;
}
