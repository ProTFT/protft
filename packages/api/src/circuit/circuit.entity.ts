import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Set } from "../sets/set.entity";

@ObjectType()
@Entity()
export class Circuit {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [String])
  @Column("varchar", { array: true })
  region: string[];

  @Field()
  @Column()
  setId: number;

  // @Field()
  // @Column()
  // qualifiedCount: number;

  // @Field()
  // @Column()
  // qualifiedTo: number;

  @Field()
  @Column({ default: "" })
  slug: string;

  @Field(() => Set)
  @ManyToOne(() => Set)
  @JoinColumn({ name: "setId" })
  set: Set;
}
