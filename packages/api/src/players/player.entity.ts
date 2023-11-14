import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../lib/BaseEntity";
import { PlayerLink } from "../player-links/player-link.entity";

@ObjectType()
export class PlayerCalculatedStats {
  @Field(() => Float)
  averagePosition: number;

  @Field(() => Int)
  totalGames: number;

  @Field(() => Float)
  topFourCount: number;

  @Field(() => Float)
  topOneCount: number;

  @Field(() => Float)
  eigthCount: number;
}

@ObjectType()
@Entity()
@Index(["slug"], { unique: true })
@Index(["name"], { unique: false })
export class Player extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  playerStats?: PlayerCalculatedStats;

  @Field(() => [PlayerLink])
  links: PlayerLink[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  region?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country?: string;

  @Field()
  @Column({ default: "" })
  slug?: string;

  @Field(() => [String])
  @Column("varchar", { array: true, default: [] })
  alias: string[];
}
