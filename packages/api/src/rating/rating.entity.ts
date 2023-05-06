import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tournament } from "../tournaments/tournament.entity";
import { Player } from "../players/player.entity";

@ObjectType()
@Entity()
export class Rating {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
}

@ObjectType()
@Entity()
export class PlayerRating {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  ratingId: number;

  @Field(() => Int)
  @Column()
  @Index()
  playerId: number;

  @Field(() => Int)
  @Column()
  tournamentId: number;

  @Field(() => Float)
  @Column({ type: "decimal", precision: 20, scale: 10, default: 0.0 })
  ratingVariation: number;

  @Field(() => Float)
  @Column({ type: "decimal", precision: 20, scale: 10, default: 0.0 })
  currentMu: number;

  @Field(() => Float)
  @Column({ type: "decimal", precision: 20, scale: 10, default: 0.0 })
  currentSigma: number;

  @Field(() => Float)
  @Column({ type: "decimal", precision: 20, scale: 10, default: 0.0 })
  currentRating: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.id, {
    onDelete: "CASCADE",
  })
  tournament: Tournament;

  @ManyToOne(() => Player, (player) => player.id, {
    onDelete: "CASCADE",
  })
  player: Player;

  @ManyToOne(() => Rating, (rating) => rating.id, {
    onDelete: "CASCADE",
  })
  rating: Rating;
}
