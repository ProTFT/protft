import slugify from "slugify";
import { SetsService } from "../sets/sets.service";
import { Tournament } from "./entities/tournament.entity";

export const createSlug = async (
  tournament: Pick<Tournament, "name" | "setId" | "region"> &
    Partial<Pick<Tournament, "set">>,
  setsService: SetsService,
): Promise<string> => {
  let setName = tournament.set?.name;
  if (!setName) {
    const { name } = await setsService.findOne(tournament.setId);
    setName = name;
  }
  return slugify(`${setName}-${tournament.region}-${tournament.name}`, {
    lower: true,
    strict: true,
  });
};
