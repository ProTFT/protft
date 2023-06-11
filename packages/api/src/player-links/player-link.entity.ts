import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Player } from "../players/player.entity";

@Entity()
@ObjectType()
export class PlayerLink {
  @PrimaryColumn()
  @Field(() => Int)
  playerId: number;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  link: string;

  @ManyToOne(() => Player, (player) => player.id, {
    onDelete: "CASCADE",
  })
  player: Player;
}
