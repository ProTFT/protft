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
  OneToOne,
} from "typeorm";
import { Nullable } from "../../lib/Nullable";
import { Player } from "../../players/player.entity";
import { Stage } from "../../stages/stage.entity";
import { TournamentMetadata } from "./tournament-metadata.entity";
import { Set } from "../../sets/set.entity";
import { BaseEntity } from "../../lib/BaseEntity";

@ObjectType()
@Entity()
@Index(["slug"], { unique: true, where: `\"deletedAt\" is null` })
export class Tournament extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [String], { nullable: true })
  @Column("varchar", { nullable: true, array: true })
  region: Nullable<string[]>;

  @Field(() => String, { nullable: true })
  @Column("varchar", { nullable: true })
  host: Nullable<string>;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  participantsNumber: Nullable<number>;

  @Field(() => Float, { nullable: true })
  @Column("int", { nullable: true })
  prizePool: Nullable<number>;

  @Field(() => String, { nullable: true })
  @Column("varchar", { nullable: true })
  currency: Nullable<string>;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column("timestamp without time zone", { nullable: true })
  startDate: Nullable<Date>;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column("timestamp without time zone", { nullable: true })
  endDate: Nullable<Date>;

  @Field()
  @Column()
  setId: number;

  @Field()
  @Column({ default: "" })
  slug: string;

  @Field()
  @Column({ default: true })
  visibility: boolean;

  @Column({ default: false })
  isAmateur: boolean;

  @Column("varchar", { nullable: true })
  description: Nullable<string>;

  @Column("varchar", { nullable: true })
  image: Nullable<string>;

  @Column("integer", { array: true, default: [] })
  editPermission: number[];

  @Field(() => Int, { nullable: true })
  nextStartTime: Nullable<number>;

  @Field(() => Set)
  @ManyToOne(() => Set)
  @JoinColumn({ name: "setId" })
  set: Set;

  @Field(() => [Stage], { nullable: true })
  @OneToMany(() => Stage, (stage) => stage.tournament)
  stages: Nullable<Stage[]>;

  @Field(() => [Player], { nullable: true })
  @ManyToMany(() => Player, { cascade: true })
  @JoinTable()
  players: Nullable<Player[]>;

  @OneToOne(() => TournamentMetadata, (metadata) => metadata.tournament, {
    cascade: true,
  })
  metadata: Nullable<TournamentMetadata>;
}
