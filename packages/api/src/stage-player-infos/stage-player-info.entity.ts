import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Player } from "../players/player.entity";
import { Stage } from "../stages/stage.entity";

@Entity()
export class StagePlayerInfo {
  @PrimaryColumn()
  stageId: number;

  @PrimaryColumn()
  playerId: number;

  @Column({ nullable: true })
  extraPoints?: number;

  @Column({ nullable: true })
  tiebreakerRanking?: number;

  @ManyToOne(() => Stage, (stage) => stage.id)
  stage: Stage;

  @ManyToOne(() => Player, (player) => player.id)
  player: Player;
}
