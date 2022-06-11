import { Lobby } from "../lobbies/lobby.entity";
import { Player } from "../players/player.entity";
import { Stage } from "../stages/stage.entity";
import { Tournament } from "../tournaments/tournament.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Round } from "./round.entity";

@Entity()
@Index(["tournamentId", "stageId", "lobbyId", "roundId", "position"], {
  unique: true,
})
export class RoundResult {
  @PrimaryColumn()
  tournamentId: number;

  @PrimaryColumn()
  stageId: number;

  @PrimaryColumn()
  lobbyId: number;

  @PrimaryColumn()
  roundId: number;

  @Column()
  playerId: number;

  @PrimaryColumn()
  position: number;

  @ManyToOne(() => Tournament)
  @JoinColumn({ name: "tournamentId" })
  tournament: Tournament;

  @ManyToOne(() => Stage)
  @JoinColumn({ name: "stageId" })
  stage: Stage;

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
