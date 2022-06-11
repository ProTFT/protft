import { fromRawToConsolidatedRoundResults } from "./lobbies.adapter";
import { RawRoundResults } from "./lobbies.service";
import { PlayerLobbyResult } from "./lobby.entity";

const rawRoundResults: RawRoundResults[] = [
  {
    roundId: 1,
    country: "Brazil",
    name: "Heim",
    playerId: 1,
    points: 8,
    position: 1,
    region: "BR",
    sequence: 1,
  },
  {
    roundId: 2,
    country: "Brazil",
    name: "Heim",
    playerId: 1,
    points: 7,
    position: 2,
    region: "BR",
    sequence: 2,
  },
  {
    roundId: 1,
    country: "USA",
    name: "Mortdog",
    playerId: 2,
    points: 7,
    position: 2,
    region: "NA",
    sequence: 1,
  },
  {
    roundId: 2,
    country: "USA",
    name: "Mortdog",
    playerId: 2,
    points: 8,
    position: 1,
    region: "NA",
    sequence: 2,
  },
];

const expected: PlayerLobbyResult[] = [
  {
    player: {
      id: 1,
      name: "Heim",
      region: "BR",
      country: "Brazil",
    },
    positions: [1, 2],
    points: [8, 7],
  },
  {
    player: {
      id: 2,
      name: "Mortdog",
      region: "NA",
      country: "USA",
    },
    positions: [2, 1],
    points: [7, 8],
  },
];

describe("LobbiesAdapter", () => {
  it("should consolidate results based on playerId", () => {
    expect(fromRawToConsolidatedRoundResults(rawRoundResults)).toStrictEqual(
      expected,
    );
  });
});
