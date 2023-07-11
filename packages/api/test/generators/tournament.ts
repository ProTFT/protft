import { Tournament } from "../../src/tournaments/entities/tournament.entity";
import { set as genSet } from "./set";

type TournamentGeneratorParams = Partial<Tournament>;

export function tournament(
  tournamentParams?: TournamentGeneratorParams,
): Tournament {
  const randomId = Math.random() * 999;
  return {
    id: randomId,
    name: "",
    region: [],
    host: "",
    participantsNumber: randomId,
    prizePool: randomId,
    startDate: new Date(),
    endDate: new Date(),
    setId: randomId,
    set: genSet({}),
    stages: [],
    slug: "",
    visibility: false,
    currency: "",
    description: "",
    image: "",
    isAmateur: false,
    metadata: null,
    nextStartTime: 123,
    players: [],
    ...tournamentParams,
  };
}
