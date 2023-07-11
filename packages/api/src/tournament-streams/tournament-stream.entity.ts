import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Tournament } from "../tournaments/entities/tournament.entity";

@Entity()
@ObjectType()
export class TournamentStream {
  @PrimaryColumn()
  @Field(() => Int)
  tournamentId: number;

  @Column()
  @Field()
  @PrimaryColumn()
  name: string;

  @Column()
  @Field()
  link: string;

  @Column()
  @Field()
  platform: string;

  @Column()
  @Field()
  language: string;

  @Column()
  @Field()
  isLive: boolean;

  @Column({ default: false })
  @Field()
  isVOD: boolean;

  @ManyToOne(() => Tournament, (tournament) => tournament.id, {
    onDelete: "CASCADE",
  })
  tournament: Tournament;
}
