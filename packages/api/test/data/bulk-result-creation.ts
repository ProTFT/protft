import { LobbyGroup } from "../../src/lobbies/lobby-group.entity";
import { Lobby } from "../../src/lobbies/lobby.entity";
import { Round } from "../../src/rounds/round.entity";
import { StagePlayerInfo } from "../../src/stage-player-infos/stage-player-info.entity";

const players = {
  1: "Ana",
  2: "Boris",
  3: "Camila",
  4: "Denis",
  5: "Ewan",
  6: "Fabio",
  7: "Groot",
  8: "Henrique",
  9: "Inacio",
  10: "Julio",
  11: "Karen",
  12: "lucas",
  13: "matheus",
  14: "NataLIA",
  15: "Orfeu",
  16: "pedro",
};

const lobbyGroups = [1, 2, 3];

const rounds = [1, 2, 3, 4, 5, 6];

const lobbies = [
  [1, 2],
  [3, 4],
  [5, 6],
];

export const mockStagePlayers = Object.entries(players).map(([key, value]) => ({
  player: {
    id: Number(key),
    name: value,
  },
})) as unknown as StagePlayerInfo[];

export const mockLobbyGroups = lobbyGroups.map((value) => ({
  id: value,
  roundsPlayed: 2,
  sequence: value,
})) as unknown as LobbyGroup[];

export const mockRounds = rounds.map((value) => ({
  id: value,
  sequence: value,
})) as unknown as Round[];

export const mockLobbies = lobbies.flatMap((lobbyByLobbyGroup, index) => {
  return lobbyByLobbyGroup.map((lobby) => ({
    id: lobby,
    sequence: lobby,
    lobbyGroupId: index + 1,
  }));
}) as Lobby[];
