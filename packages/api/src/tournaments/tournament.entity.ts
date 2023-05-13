import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from "@nestjs/graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
} from "typeorm";
import { Stage } from "../stages/stage.entity";
import { Set } from "../sets/set.entity";
import { Player } from "../players/player.entity";

@ObjectType()
@Entity()
@Index(["slug"], { unique: true })
export class Tournament {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [String], { nullable: true })
  @Column("varchar", { nullable: true, array: true })
  region?: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  host?: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  participantsNumber?: number;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true })
  prizePool?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  currency?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ nullable: true })
  startDate?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ nullable: true })
  endDate?: Date;

  @Field()
  @Column()
  setId: number;

  @Field()
  @Column({ default: "" })
  slug: string;

  @Field()
  @Column({ default: true })
  visibility: boolean;

  @Field(() => Int, { nullable: true })
  nextStartTime?: number;

  @Field(() => Set)
  @ManyToOne(() => Set)
  @JoinColumn({ name: "setId" })
  set: Set;

  @Field(() => [Stage], { nullable: true })
  @OneToMany(() => Stage, (stage) => stage.tournament)
  stages?: Stage[];

  @Field(() => [Player], { nullable: true })
  @ManyToMany(() => Player, { cascade: true })
  @JoinTable()
  players?: Player[];
}
