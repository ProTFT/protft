const LETTERS_IN_ALPHABET = 26;

export const createLobbyName = (
  lobbyGroupSequence: number,
  lobbySequence: number,
): string => {
  return getLetter(lobbySequence) + String(lobbyGroupSequence);
};

const getLetter = (lobbySequence: number) => {
  const BASE_CHARCODE = 64;
  if (lobbySequence <= LETTERS_IN_ALPHABET) {
    return String.fromCharCode(BASE_CHARCODE + lobbySequence).toUpperCase();
  }
  const remainder = lobbySequence % LETTERS_IN_ALPHABET;
  const quotient = Math.floor(lobbySequence / LETTERS_IN_ALPHABET);

  if (!remainder) {
    return (
      String.fromCharCode(BASE_CHARCODE + (quotient - 1)) +
      String.fromCharCode(BASE_CHARCODE + LETTERS_IN_ALPHABET)
    );
  }

  return (
    String.fromCharCode(BASE_CHARCODE + quotient) +
    String.fromCharCode(BASE_CHARCODE + remainder)
  );
};
