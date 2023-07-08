import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lobby } from "../lobbies/lobby.entity";
import { Round } from "../rounds/round.entity";
import { PointSchema } from "../points/point.entity";
import { Tournament } from "../tournaments/tournament.entity";
import { StagePlayerInfo } from "../stage-player-infos/stage-player-info.entity";
import { LobbyGroup } from "../lobbies/lobby-group.entity";
import { StageType } from "./types/StageType";

registerEnumType(StageType, { name: "StageType" });

@ObjectType()
@Entity()
@Index(["tournamentId", "sequence"], { unique: true })
export class Stage {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: "" })
  description: string;

  @Field(() => Int)
  @Column()
  sequence: number;

  @Field(() => Int)
  @Column()
  tournamentId: number;

  @Field(() => Int)
  @Column()
  pointSchemaId: number;

  @Field(() => [Int])
  @Column("int", { nullable: true, array: true })
  tiebreakers?: number[];

  @Field(() => StageType)
  @Column({ default: StageType.RANKING, enum: StageType, type: "enum" })
  stageType: StageType;

  @Field(() => Int)
  @Column({ default: 0 })
  qualifiedCount: number;

  @Field(() => Int)
  roundCount: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  startDateTime?: string;

  @Field(() => [StagePlayerInfo])
  @OneToMany(
    () => StagePlayerInfo,
    (stagePlayerInfo) => stagePlayerInfo.stage,
    { cascade: true },
  )
  players: StagePlayerInfo[];

  @Field(() => [Lobby], { nullable: true })
  @OneToMany(() => Lobby, (lobby) => lobby.stage, {
    cascade: true,
  })
  lobbies?: Lobby[];

  @Field(() => [LobbyGroup])
  @OneToMany(() => LobbyGroup, (lobbyGroup) => lobbyGroup.stage, {
    cascade: true,
  })
  lobbyGroups: LobbyGroup[];

  @Field(() => [Round], { nullable: true })
  @OneToMany(() => Round, (round) => round.stage, {
    cascade: true,
  })
  rounds?: Round[];

  @ManyToOne(() => Tournament, (tournament) => tournament.id, {
    onDelete: "CASCADE",
  })
  tournament: Tournament;

  @Field(() => PointSchema)
  @JoinColumn({ name: "pointSchemaId" })
  pointSchema: PointSchema;
}
