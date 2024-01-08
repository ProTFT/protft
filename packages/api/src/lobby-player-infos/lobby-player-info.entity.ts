import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Generated,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { BaseEntity } from "../lib/BaseEntity";
import { Lobby } from "../lobbies/lobby.entity";
import { Player } from "../players/player.entity";
import { RoundResult } from "../round-results/round-result.entity";

const LOBBY_PLAYER_UNIQUE_CONSTRAINT = "lobbyPlayer";

@ObjectType()
@Entity()
@Index(LOBBY_PLAYER_UNIQUE_CONSTRAINT, ["lobbyId", "playerId"], {
  unique: true,
  where: '"deletedAt" is null',
})
export class LobbyPlayerInfo extends BaseEntity {
  @Generated()
  @PrimaryColumn()
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  @Column()
  lobbyId: number;

  @Field(() => Int)
  @Column()
  playerId: number;

  @ManyToOne(() => Lobby, (lobby) => lobby.id, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  lobby: Lobby;

  @ManyToOne(() => Player, (player) => player.id, {
    onDelete: "CASCADE",
  })
  player: Player;

  @OneToMany(() => RoundResult, (roundResult) => roundResult.lobbyPlayerInfo, {
    onDelete: "CASCADE",
  })
  roundResults: RoundResult[];
}
