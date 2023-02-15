export const createLobbyName = (
  lobbyGroupSequence: number,
  lobbySequence: number,
): string => {
  const BASE_CHARCODE = 64;
  return (
    String.fromCharCode(BASE_CHARCODE + lobbySequence).toUpperCase() +
    String(lobbyGroupSequence)
  );
};
