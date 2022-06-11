import { Lobby } from "../lobbies/lobby.entity";
import { Stage } from "../stages/stage.entity";
import { Tournament } from "../tournaments/tournament.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoundResult } from "./round-result.entity";

@Entity()
@Index(["tournamentId", "stageId", "lobbyId", "sequence"], { unique: true })
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sequence: number;

  @Column()
  tournamentId: number;

  @Column()
  stageId: number;

  @Column()
  lobbyId: number;

  @OneToMany(() => RoundResult, (roundResult) => roundResult.roundId)
  roundResults: RoundResult[];

  @ManyToOne(() => Tournament)
  @JoinColumn({ name: "tournamentId" })
  tournament: Tournament;

  @ManyToOne(() => Stage)
  @JoinColumn({ name: "stageId" })
  stage: Stage;

  @ManyToOne(() => Lobby)
  @JoinColumn({ name: "lobbyId" })
  lobby: Lobby;
}
