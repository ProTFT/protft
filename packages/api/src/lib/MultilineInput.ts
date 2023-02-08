import { BadRequestException } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { Player } from "../players/player.entity";

export const parseMultilinePlayerNames = async (
  playerNames: string,
  sqlManager: EntityManager,
): Promise<number[]> => {
  const namesToFind = playerNames.replace(/\r/g, "").split("\n");
  const query = sqlManager.createQueryBuilder().select("*").from("player", "p");

  const queryWithAllConditions = namesToFind.reduce((prev, curr, index) => {
    if (index === 0) {
      return prev.where(`p.name = '${curr}'`);
    }
    return prev.orWhere(`p.name = '${curr}'`);
  }, query);

  const results = (await queryWithAllConditions.getRawMany()) as Player[];

  if (results.length !== namesToFind.length) {
    throw new BadRequestException(
      `Provided names: ${namesToFind.length}, names found: ${results.length}`,
    );
  }

  return results.map((r) => r.id);
};
