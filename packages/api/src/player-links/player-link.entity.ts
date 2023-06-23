import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Player } from "../players/player.entity";

@Entity()
@ObjectType()
@Index(["playerId", "type"], { unique: true })
export class PlayerLink {
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
