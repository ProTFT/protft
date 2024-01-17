import { BadRequestException } from "@nestjs/common";
import {
  Brackets,
  EntityManager,
  QueryBuilder,
  SelectQueryBuilder,
} from "typeorm";
import { Player } from "../players/player.entity";
import { RegionCode } from "../tournaments/types/region.types";
import { createOrWhereConditions } from "./DBCompositeFilters";

export const parseMultilinePlayerNamesFromAll = async (
  playerNames: string,
  sqlManager: EntityManager,
  region: string[],
): Promise<number[]> => {
  const query = basePlayerTableQuery(sqlManager, region);
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

const basePlayerTableQuery = (
  sqlManager: EntityManager,
  [region]: string[],
) => {
  const query = sqlManager
    .createQueryBuilder()
    .select("p.id, p.name")
    .distinct()
    .from("player", "p")
    .leftJoin(
      (qb: QueryBuilder<Player>) => {
        qb.getQuery = () => `LATERAL unnest(p.alias)`;
        qb.setParameters({});
        return qb;
      },
      "formatted_alias",
      "true",
    );

  if (region !== RegionCode.WO) {
    return query.where(`p.region = '${region}'`);
  }
  return query.where("p.id > 0");
};

const baseTournamentPlayerTableQuery = (
  sqlManager: EntityManager,
  tournamentId: number,
) =>
  sqlManager
    .createQueryBuilder()
    .select("p.id, p.name")
    .distinct()
    .from("tournament_players_player", "tpp")
    .innerJoin("player", "p", "tpp.playerId = p.id")
    .leftJoin(
      (qb: QueryBuilder<Player>) => {
        qb.getQuery = () => `LATERAL unnest(p.alias)`;
        qb.setParameters({});
        return qb;
      },
      "formatted_alias",
      "true",
    )
    .where("tpp.tournamentId = :tournamentId", { tournamentId });

const queryPlayers = async (
  playerNames: string,
  baseQuery: SelectQueryBuilder<unknown>,
): Promise<number[]> => {
  const namesToFind = playerNames.replace(/\r/g, "").split("\n");
  const searchConditions = namesToFind.map(
    (name) => `p.name ILIKE '${name}' or formatted_alias ILIKE '${name}'`,
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
