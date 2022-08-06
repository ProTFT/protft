import { Player } from "../players/player.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Round } from "./round.entity";
import { Lobby } from "./lobby.entity";

@Entity()
@Index(["lobbyId", "roundId", "position"], {
  unique: true,
})
export class RoundResult {
  @PrimaryColumn()
  roundId: number;

  @PrimaryColumn()
  lobbyId: number;

  @Column()
  playerId: number;

  @PrimaryColumn()
  position: number;

  @ManyToOne(() => Lobby)
  @JoinColumn({ name: "lobbyId" })
  lobby: Lobby;

  @ManyToOne(() => Round)
  @JoinColumn({ name: "roundId" })
  round: Round;

  @ManyToOne(() => Player, {})
  @JoinColumn({ name: "playerId" })
  player: Player;
}
