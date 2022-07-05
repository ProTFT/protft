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
} from "typeorm";
import { Stage } from "../stages/stage.entity";
import { Set } from "../sets/set.entity";

@ObjectType()
@Entity()
export class Tournament {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [String], { nullable: true })
  @Column("varchar", { nullable: true, array: true })
  region: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  host: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  participantsNumber: number;

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true })
  prizePool: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ nullable: true })
  startDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ nullable: true })
  endDate: Date;

  @Field()
  @Column()
  setId: number;

  @Field(() => Set)
  @ManyToOne(() => Set)
  @JoinColumn({ name: "setId" })
  set: Set;

  @Field(() => [Stage], { nullable: true })
  @OneToMany(() => Stage, (stage) => stage.tournamentId)
  stages: Stage[];
}
