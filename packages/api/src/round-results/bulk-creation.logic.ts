import { BadRequestException } from "@nestjs/common";
import chunk from "lodash.chunk";
import { LobbyGroup } from "../lobbies/lobby-group.entity";
import { Lobby } from "../lobbies/lobby.entity";
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";
import { findPlayerByText } from "../players/player.utils";
import { Round } from "../rounds/round.entity";
import { StagePlayerInfo } from "../stage-player-infos/stage-player-info.entity";
import { PLAYERS_IN_TFT_LOBBY } from "../stages/stages.service";
import { RoundResult } from "./round-result.entity";

interface BaseFileLine {
  playerId: number;
  playerPositions: number[];
}

interface FileLineWithLobby extends BaseFileLine {
  lobbyId: number;
}

interface FileLineWithLobbyAndRound {
  playerId: number;
  lobbyId: number;
  roundId: number;
  position: number;
}

interface LobbyGroupRounds {
  [lobbyGroupId: number]: Round[];
}

interface LobbyRounds {
  [lobbyId: number]: number[];
}

export const buildResults = (
  lines: string[],
  allStagePlayers: StagePlayerInfo[],
  allStageLobbyGroups: LobbyGroup[],
  allStageRounds: Round[],
  allStageLobbies: Lobby[],
): FileLineWithLobbyAndRound[] => {
  const playersWithPositions: BaseFileLine[] = parseFileLine(
    lines,
    allStagePlayers,
  );

  const roundsPerLobbyGroup = getRoundsPerLobbyGroup(
    allStageLobbyGroups,
    allStageRounds,
  );

  const roundsPerLobby = getRoundsPerLobby(
    allStageLobbies,
    roundsPerLobbyGroup,
  );

  const resultsByLobby = chunk(playersWithPositions, PLAYERS_IN_TFT_LOBBY);

  const resultsWithPlayerAndLobby = crossResultsWithLobby(
    resultsByLobby,
    allStageLobbies,
  );

  return crossResultsWithRounds(resultsWithPlayerAndLobby, roundsPerLobby);
};

export const extractLobbyPlayerEntries = (
  resultEntries: FileLineWithLobbyAndRound[],
): Pick<LobbyPlayerInfo, "playerId" | "lobbyId">[] => {
  const uniqueCombinationsOfPlayerAndLobby = new Set(
    resultEntries.map((entry) => `${entry.playerId},${entry.lobbyId}`),
  );
  return Array.from(uniqueCombinationsOfPlayerAndLobby).map(
    (hashedIdentifier) => {
      const [playerId, lobbyId] = hashedIdentifier.split(",");
      return {
        playerId: Number(playerId),
        lobbyId: Number(lobbyId),
      };
    },
  );
};

export const createRoundResultEntries = (
  resultEntries: FileLineWithLobbyAndRound[],
  lobbyPlayers: LobbyPlayerInfo[],
): Pick<RoundResult, "lobbyPlayerId" | "roundId" | "position">[] =>
  resultEntries.map((p) => ({
    lobbyPlayerId: lobbyPlayers.find(
      (r) => r.lobbyId === p.lobbyId && r.playerId === p.playerId,
    ).id,
    roundId: p.roundId,
    position: p.position,
  }));

export const sortLobbies = (
  allStageLobbyGroups: LobbyGroup[],
  allStageLobbies: Lobby[],
) => {
  return allStageLobbies
    .map((lobby) => ({
      ...lobby,
      lobbyGroupSequence: allStageLobbyGroups.find(
        (lobbyGroup) => lobbyGroup.id === lobby.lobbyGroupId,
      ).sequence,
    }))
    .sort((a, b) => {
      const orderByLobbyGroupSequence =
        a.lobbyGroupSequence - b.lobbyGroupSequence;
      if (orderByLobbyGroupSequence === 0) {
        return a.sequence - b.sequence;
      }
      return orderByLobbyGroupSequence;
    });
};

const sortRounds = (allStageRounds: Round[]) => {
  return allStageRounds.sort((a, b) => a.sequence - b.sequence);
};

function parseFileLine(
  lines: string[],
  allStagePlayers: StagePlayerInfo[],
): BaseFileLine[] {
  return lines.map((line) => {
    const [playerName, ...positions] = line.split(",");
    const possiblePlayers = allStagePlayers.map(
      (stagePlayer) => stagePlayer.player,
    );
    const player = findPlayerByText(playerName, possiblePlayers);
    if (!player) {
      throw new BadRequestException(`Player ${playerName} not found`);
    }
    return {
      playerId: player.id,
      playerPositions: positions.filter(Boolean).map((p) => Number(p)),
    };
  });
}

function getRoundsPerLobbyGroup(
  allStageLobbyGroups: LobbyGroup[],
  allStageRounds: Round[],
): LobbyGroupRounds {
  let count = 0;
  const sortedRounds = sortRounds(allStageRounds);
  const roundsPerLobbyGroup = allStageLobbyGroups
    .sort((a, b) => a.sequence - b.sequence)
    .reduce<LobbyGroupRounds>((prev, curr) => {
      const roundCount = curr.roundsPlayed;
      const result = {
        [curr.id]: sortedRounds.slice(count, count + roundCount),
      };
      count += roundCount;
      return {
        ...prev,
        ...result,
      };
    }, {});
  return roundsPerLobbyGroup;
}

function getRoundsPerLobby(
  allStageLobbies: Lobby[],
  roundsPerLobbyGroup: LobbyGroupRounds,
): LobbyRounds {
  return allStageLobbies.reduce<{
    [lobbyId: number]: number[];
  }>(
    (prev, curr) => ({
      ...prev,
      [curr.id]: roundsPerLobbyGroup[curr.lobbyGroupId].map((r) => r.id),
    }),
    {},
  );
}

function crossResultsWithLobby(
  resultsByLobby: BaseFileLine[][],
  allStageLobbies: Lobby[],
): FileLineWithLobby[] {
  return resultsByLobby.reduce<FileLineWithLobby[]>(
    (prev, curr, index) => [
      ...prev,
      ...curr.map((result) => ({
        playerId: result.playerId,
        playerPositions: result.playerPositions,
        lobbyId: allStageLobbies[index].id,
      })),
    ],
    [],
  );
}

function crossResultsWithRounds(
  resultsWithPlayerAndLobby: FileLineWithLobby[],
  roundsPerLobby: LobbyRounds,
): FileLineWithLobbyAndRound[] {
  return resultsWithPlayerAndLobby.reduce<FileLineWithLobbyAndRound[]>(
    (prev, curr) => {
      const newEntries: FileLineWithLobbyAndRound[] = curr.playerPositions.map(
        (position, index) => ({
          playerId: curr.playerId,
          lobbyId: curr.lobbyId,
          position,
          roundId: roundsPerLobby[curr.lobbyId][index],
        }),
      );
      return [...prev, ...newEntries];
    },
    [],
  );
}
