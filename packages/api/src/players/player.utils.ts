import { Player } from "./player.entity";

export const findPlayerByText = (inputText: string, players: Player[]) => {
  const lowerCaseInput = inputText.toLowerCase();
  const lowerCasePlayers = players.map((player) => ({
    ...player,
    name: player.name.toLowerCase(),
    alias: player.alias.map((a) => a.toLowerCase()),
  }));

  return lowerCasePlayers.find(
    (p) => p.name === lowerCaseInput || p.alias.includes(lowerCaseInput),
  );
};

interface ObjectWithName {
  name: string;
}

export const findTextByPlayer = <T extends ObjectWithName>(
  inputPlayer: Player,
  fileEntryList: T[],
): T => {
  const lowerCaseInput = fileEntryList.map((entry) => ({
    ...entry,
    name: entry.name.toLowerCase(),
  }));
  const lowerCasePlayer = {
    ...inputPlayer,
    name: inputPlayer.name.toLowerCase(),
    alias: inputPlayer.alias.map((a) => a.toLowerCase()),
  };

  return lowerCaseInput.find(
    (p) =>
      lowerCasePlayer.name === p.name || lowerCasePlayer.alias.includes(p.name),
  );
};
