const mockPlayer = {
  id: 1,
  name: "anyName",
};

export const generatePlayer = (positions: number[], tiebreakerRanking = 1) => {
  return {
    player: mockPlayer,
    positions,
    points: positions.map((position) => 9 - position),
    tiebreakerRanking: tiebreakerRanking,
    lobbyPlayerId: 1,
    pastPoints: 0,
    pastPositions: [],
  };
};

export const generatePlayerWithPastResults = (
  positions: number[],
  pastPoints: number,
  pastPositions: number[] = [],
) => {
  return {
    ...generatePlayer(positions),
    pastPoints,
    pastPositions,
  };
};
