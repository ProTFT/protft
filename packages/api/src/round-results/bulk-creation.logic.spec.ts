import {
  mockLobbies,
  mockLobbyGroups,
  mockRounds,
  mockStagePlayers,
} from "../../test/data/bulk-result-creation";
import { LobbyPlayerInfo } from "../lobby-player-infos/lobby-player-info.entity";
import {
  buildResults,
  createRoundResultEntries,
  extractLobbyPlayerEntries,
} from "./bulk-creation.logic";

describe("Bulk result creation", () => {
  describe("buildResults", () => {
    it("should cross data and generate results for each player and round", () => {
      const lines = [
        "Ana,1,2",
        "Boris,1,2",
        "Camila,1,2",
        "Denis,1,2",
        "Ewan,1,2",
        "Fabio,1,2",
        "Groot,1,2",
        "Henrique,1,2",
        "inacio,1,2",
        "Julio,1,2",
        "Karen,1,2",
        "Lucas,1,2",
        "Matheus,1,2",
        "Natalia,1,2",
        "orfeu,1,2",
        "Pedro,1,2",
        "Ana,3,4",
        "Boris,3,4",
        "Camila,3,4",
        "Denis,3,4",
        "Ewan,3,4",
        "Fabio,3,4",
        "Groot,3,4",
        "Henrique,3,4",
        "inacio,3,4",
        "Julio,3,4",
        "Karen,3,4",
        "Lucas,3,4",
        "Matheus,3,4",
        "Natalia,3,4",
        "orfeu,3,4",
        "Pedro,3,4",
        "Ana,5,6",
        "Boris,5,6",
        "Camila,5,6",
        "Denis,5,6",
        "Ewan,5,6",
        "Fabio,5,6",
        "Groot,5,6",
        "Henrique,5,6",
        "inacio,5,6",
        "Julio,5,6",
        "Karen,5,6",
        "Lucas,5,6",
        "Matheus,5,6",
        "Natalia,5,6",
        "orfeu,5,6",
        "Pedro,5,6",
      ];
      const numberOfPlayers = 16;
      const numberOfRounds = 6;
      const result = buildResults(
        lines,
        mockStagePlayers,
        mockLobbyGroups,
        mockRounds,
        mockLobbies,
      );
      expect(result).toHaveLength(numberOfPlayers * numberOfRounds);
      expect(result.filter((r) => r.playerId === 1)).toHaveLength(
        numberOfRounds,
      );
    });

    it("if player is not found, should throw", () => {
      const lines = ["NotFoundName,1,2"];
      expect(() =>
        buildResults(
          lines,
          mockStagePlayers,
          mockLobbyGroups,
          mockRounds,
          mockLobbies,
        ),
      ).toThrowError("Player NotFoundName not found");
    });
  });

  describe("extractLobbyPlayerEntries", () => {
    it("should transform results to lobby player object", () => {
      const results = [
        { playerId: 1, lobbyId: 1, roundId: 1, position: 1 },
        { playerId: 2, lobbyId: 2, roundId: 1, position: 1 },
        { playerId: 3, lobbyId: 2, roundId: 1, position: 1 },
      ];
      expect(extractLobbyPlayerEntries(results)).toStrictEqual([
        { playerId: 1, lobbyId: 1 },
        { playerId: 2, lobbyId: 2 },
        { playerId: 3, lobbyId: 2 },
      ]);
    });

    it("if there's more than one position, should not repeat player and lobby", () => {
      const results = [
        { playerId: 1, lobbyId: 1, roundId: 1, position: 1 },
        { playerId: 1, lobbyId: 1, roundId: 2, position: 2 },
        { playerId: 2, lobbyId: 2, roundId: 1, position: 1 },
        { playerId: 3, lobbyId: 2, roundId: 1, position: 1 },
        { playerId: 3, lobbyId: 2, roundId: 2, position: 2 },
        { playerId: 3, lobbyId: 2, roundId: 3, position: 3 },
      ];
      expect(extractLobbyPlayerEntries(results)).toStrictEqual([
        { playerId: 1, lobbyId: 1 },
        { playerId: 2, lobbyId: 2 },
        { playerId: 3, lobbyId: 2 },
      ]);
    });
  });

  describe("extractLobbyPlayerEntries", () => {
    it("should transform results to lobby player object", () => {
      const results = [
        { playerId: 1, lobbyId: 1, roundId: 1, position: 1 },
        { playerId: 2, lobbyId: 2, roundId: 1, position: 1 },
        { playerId: 3, lobbyId: 2, roundId: 1, position: 1 },
      ];
      expect(extractLobbyPlayerEntries(results)).toStrictEqual([
        { playerId: 1, lobbyId: 1 },
        { playerId: 2, lobbyId: 2 },
        { playerId: 3, lobbyId: 2 },
      ]);
    });
  });

  describe("createRoundResultEntries", () => {
    it("should transform results to round result entries", () => {
      const results = [
        { playerId: 1, lobbyId: 1, roundId: 1, position: 1 },
        { playerId: 2, lobbyId: 2, roundId: 1, position: 2 },
        { playerId: 3, lobbyId: 2, roundId: 1, position: 3 },
      ];

      const lobbyPlayerEntries = [
        { playerId: 1, lobbyId: 1, id: 10 },
        { playerId: 2, lobbyId: 2, id: 11 },
        { playerId: 3, lobbyId: 2, id: 12 },
      ] as LobbyPlayerInfo[];

      expect(
        createRoundResultEntries(results, lobbyPlayerEntries),
      ).toStrictEqual([
        { lobbyPlayerId: 10, roundId: 1, position: 1 },
        { lobbyPlayerId: 11, roundId: 1, position: 2 },
        { lobbyPlayerId: 12, roundId: 1, position: 3 },
      ]);
    });
  });
});
