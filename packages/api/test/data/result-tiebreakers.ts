const mockPlayer = {
  id: 1,
  name: "anyName",
};

export const generatePlayer = (positions: number[]) => {
  return {
    player: mockPlayer,
    positions,
    points: positions.map((position) => 9 - position),
  };
};
