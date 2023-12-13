import { PLAYERS_IN_TFT_LOBBY } from "../../stages/stages.service";

export interface PlayerWithSeed {
  id: number;
  ranking: number;
}

export const snakeSeed = (players: PlayerWithSeed[]) => {
  console.log(players);
  const numberOfLobbies = players.length / PLAYERS_IN_TFT_LOBBY;
  const arrayOfLobbies = new Array(numberOfLobbies).fill([]);
  const playersSorted = [...players].sort((a, b) => a.ranking - b.ranking);
  let outerIndex = 0;
  return playersSorted.reduce<Array<Array<number>>>((prev, curr, index) => {
    let lobbySeq = 0;
    if (outerIndex % 2 === 0) {
      lobbySeq = curr.ranking - outerIndex * numberOfLobbies;
    } else {
      lobbySeq =
        curr.ranking -
        (2 * curr.ranking - ((outerIndex + 1) * numberOfLobbies + 1));
    }
    const arrayIndex = lobbySeq - 1; // array starting from zero
    prev[arrayIndex] = [...prev[arrayIndex], curr.id];
    if ((index + 1) % numberOfLobbies === 0) {
      outerIndex++;
    }
    return prev;
  }, arrayOfLobbies);
};
