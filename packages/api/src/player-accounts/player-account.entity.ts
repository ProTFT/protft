import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Player } from "../players/player.entity";
import { Server } from "../servers/server.entity";

@Entity()
export class PlayerAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: number;

  @Column()
  serverId: number;

  @Column()
  summonerName: string;

  @Column()
  puuid: string;

  @Column()
  validated: boolean;

  @Column()
  rank: string;

  @Column()
  rankIndex: boolean;

  @Column()
  lp: number;

  @Column()
  homeRegion: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Player, (player) => player.id, {
    onDelete: "CASCADE",
  })
  player: Player;

  @OneToOne(() => Server, (server) => server.id, {
    onDelete: "CASCADE",
  })
  server: Server;
}
