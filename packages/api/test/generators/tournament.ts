import { Tournament } from "../../src/tournaments/tournament.entity";
import { set as genSet } from "./set";

type TournamentGeneratorParams = Partial<Tournament>;

export function tournament({
  id,
  name,
  region,
  host,
  participantsNumber,
  prizePool,
  startDate,
  endDate,
  setId,
  set,
  stages,
}: TournamentGeneratorParams): Tournament {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    name: name || "",
    region: region || [],
    host: host || "",
    participantsNumber: participantsNumber || randomId,
    prizePool: prizePool || randomId,
    startDate: startDate || new Date(),
    endDate: endDate || new Date(),
    setId: setId || randomId,
    set: set || genSet({}),
    stages: stages || [],
  };
}
