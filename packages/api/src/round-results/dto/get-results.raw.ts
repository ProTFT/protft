import { Player } from "../../players/player.entity";
import { Points } from "../../points/point.entity";
import { Round } from "../../rounds/round.entity";
import { RoundResult } from "../round-result.entity";

export type RoundResultsRaw = Pick<
  RoundResult,
  "roundId" | "position" | "playerId"
> &
  Pick<Player, "name" | "region" | "country"> &
  Pick<Points, "points"> &
  Pick<Round, "sequence">;
