/* eslint-disable @typescript-eslint/no-var-requires */

const firstRoundResults = require("./512.json");
const secondRoundResults = require("./256.json");
const thirdRoundResults = require("./128.json");
const fourthRoundResults = require("./32.json");
const fifthRoundResults = require("./8.json");

const printResults = (roundResults) => {
  const firstMatch = roundResults.result.mapScores;

  const playersInLobby = roundResults.teams.map((t) => t.publicId);

  const gamesInLobby = Object.values(firstMatch).map((match) => match.teamRank);

  const finalObject = playersInLobby.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: [],
    }),
    {},
  );

  gamesInLobby.forEach((game) => {
    const entries = Object.entries(game);
    entries.forEach(([id, position]) => {
      finalObject[id] = [...finalObject[id], position];
    });
  });

  const lala = Object.entries(finalObject);
  lala.forEach(([id, positions]) => {
    console.log(`${id}\t${positions.join("\t")}`);
  });
};

fifthRoundResults.forEach((roundResult) => printResults(roundResult));
