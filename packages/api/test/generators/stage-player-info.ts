import { Player } from "../../src/players/player.entity";
import { StagePlayerInfo } from "../../src/stage-player-infos/stage-player-info.entity";
import { player as genPlayer } from "./player";
import { stage as genStage } from "./stage";

type PlayerGeneratorParams = Partial<Player>;

export function stagePlayerInfo({
  playerId,
  extraPoints,
  player,
  stage,
  stageId,
  tiebreakerRanking,
}: Partial<StagePlayerInfo>): StagePlayerInfo {
  const randomId = Math.random() * 999;
  return {
    playerId: playerId || randomId,
    extraPoints: extraPoints || randomId,
    player: player || genPlayer({}),
    stage: stage || genStage({}),
    stageId: stageId || randomId,
    tiebreakerRanking: tiebreakerRanking || randomId,
  };
}
