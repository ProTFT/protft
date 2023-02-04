import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { PlayerStats } from "./dto/get-player-stats.out";

@ObjectType()
@Entity()
@Index(["slug"], { unique: true })
@Index(["name"], { unique: false })
export class Player {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  playerStats?: PlayerStats;

  @Field({ nullable: true })
  @Column({ nullable: true })
  region?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country?: string;

  @Field()
  @Column({ default: "" })
  slug?: string;
}
