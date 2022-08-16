import { CreateLobbyResultArgs } from "../../src/round-results/dto/create-lobby-result.args";

export const inputRoundResults: CreateLobbyResultArgs = {
  lobbyId: 1,
  players: [
    {
      playerId: 1,
      positions: [
        { roundId: 1, position: 1 },
        { roundId: 2, position: 2 },
        { roundId: 3, position: 3 },
        { roundId: 4, position: 4 },
      ],
    },
    {
      playerId: 2,
      positions: [
        { roundId: 1, position: 4 },
        { roundId: 2, position: 3 },
        { roundId: 3, position: 2 },
        { roundId: 4, position: 1 },
      ],
    },
  ],
};
