import { LobbyPlayerInfo } from "../../lobby-player-infos/lobby-player-info.entity";
import { Player } from "../../players/player.entity";
import { Points } from "../../points/point.entity";
import { Round } from "../../rounds/round.entity";
import { StagePlayerInfo } from "../../stage-player-infos/stage-player-info.entity";
import { RoundResult } from "../round-result.entity";

export type RoundResultsRaw = Pick<RoundResult, "roundId" | "position"> &
  Pick<LobbyPlayerInfo, "id" | "playerId"> &
  Pick<Round, "sequence"> &
  Pick<Player, "name" | "region" | "country"> &
  Pick<Points, "points"> &
  Pick<StagePlayerInfo, "extraPoints" | "tiebreakerRanking">;
