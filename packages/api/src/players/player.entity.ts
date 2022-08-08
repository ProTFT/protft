import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class PlayerStats {
  @Field(() => Float)
  averagePosition: number;

  @Field(() => Int)
  totalGames: number;

  @Field(() => Int)
  topFourCount: number;

  @Field(() => Int)
  topOneCount: number;

  @Field(() => Int)
  eigthCount: number;
}

@ObjectType()
@Entity()
export class Player {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  playerStats: PlayerStats;

  @Field({ nullable: true })
  @Column({ nullable: true })
  region: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string;
}

@ObjectType()
export class PlayerFilterMeta {
  @Field(() => [String])
  possibleCountries: string[];

  @Field(() => [String])
  possibleRegions: string[];
}
