import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../lib/BaseEntity";
import { Player } from "../players/player.entity";

@Entity()
@ObjectType()
@Index(["playerId", "type"], { unique: true, where: '"deletedAt" is null' })
export class PlayerLink extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  @Column()
  playerId: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  link: string;

  @ManyToOne(() => Player, (player) => player.id, {
    onDelete: "CASCADE",
  })
  player: Player;
}
