import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Player } from "../players/player.entity";
import { Stage } from "../stages/stage.entity";

@ObjectType()
@Entity()
export class StagePlayerInfo {
  @Field(() => Int)
  @PrimaryColumn()
  stageId: number;

  @Field(() => Int)
  @PrimaryColumn()
  playerId: number;

  @Field(() => Int)
  @Column({ nullable: true })
  extraPoints?: number;

  @Field(() => Int)
  @Column({ nullable: true })
  tiebreakerRanking?: number;

  @ManyToOne(() => Stage, (stage) => stage.id, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  stage: Stage;

  @Field(() => Player)
  @ManyToOne(() => Player, (player) => player.id, {
    onDelete: "CASCADE",
  })
  player: Player;
}
