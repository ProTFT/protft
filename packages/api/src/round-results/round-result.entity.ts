import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Round } from "../rounds/round.entity";
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";

@Entity()
export class RoundResult {
  @PrimaryColumn()
  roundId: number;

  @PrimaryColumn()
  lobbyPlayerId: number;

  @Column()
  position: number;

  @ManyToOne(() => LobbyPlayerInfo, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "lobbyPlayerId" })
  lobbyPlayerInfo: LobbyPlayerInfo;

  @ManyToOne(() => Round, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "roundId" })
  round: Round;
}
