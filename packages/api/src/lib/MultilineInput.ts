import { BadRequestException } from "@nestjs/common";
import { Brackets, EntityManager, SelectQueryBuilder } from "typeorm";
import { Player } from "../players/player.entity";
import { createOrWhereConditions } from "./DBOrFilter";

export const parseMultilinePlayerNamesFromAll = async (
  playerNames: string,
  sqlManager: EntityManager,
): Promise<number[]> => {
  const query = basePlayerTableQuery(sqlManager);
  return queryPlayers(playerNames, query);
};

export const parseMultilinePlayerNamesFromTournament = async (
  playerNames: string,
  tournamentId: number,
  sqlManager: EntityManager,
): Promise<number[]> => {
  const query = baseTournamentPlayerTableQuery(sqlManager, tournamentId);
  return queryPlayers(playerNames, query);
};

const basePlayerTableQuery = (sqlManager: EntityManager) =>
  sqlManager
    .createQueryBuilder()
    .select("*")
    .from("player", "p")
    .where("p.id > 0"); // Dummy condition to allow orWhere on common method

const baseTournamentPlayerTableQuery = (
  sqlManager: EntityManager,
  tournamentId: number,
) =>
  sqlManager
    .createQueryBuilder()
    .select("*")
    .from("tournament_players_player", "tpp")
    .innerJoin("player", "p", "tpp.playerId = p.id")
    .where("tpp.tournamentId = :tournamentId", { tournamentId });

const queryPlayers = async (
  playerNames: string,
  baseQuery: SelectQueryBuilder<unknown>,
): Promise<number[]> => {
  const namesToFind = playerNames.replace(/\r/g, "").split("\n");
  const searchConditions = namesToFind.map(
    (name) => `p.name ILIKE '%${name}%'`,
  );

  const queryWithAllConditions = baseQuery.andWhere(
    new Brackets(createOrWhereConditions(searchConditions)),
  );

  const results = (await queryWithAllConditions.getRawMany()) as Player[];

  if (results.length < namesToFind.length) {
    throw new BadRequestException(
      `Provided names: ${namesToFind.length}, names found: ${results.length}
      \nNot found: ${namesToFind.filter(
        (n) => !results.find((r) => r.name.toLowerCase() === n.toLowerCase()),
      )}`,
    );
  }

  return results.map((r) => r.id);
};
