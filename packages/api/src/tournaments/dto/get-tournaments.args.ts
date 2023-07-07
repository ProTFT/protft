import { ArgsType, Field, Int, IntersectionType } from "@nestjs/graphql";
import { PaginationArgs } from "../../lib/dto/pagination.args";

@ArgsType()
export class BaseGetTournamentArgs {
  @Field(() => [String], { name: "region", nullable: true })
  region?: string[];

  @Field(() => [Int], { name: "setId", nullable: true })
  setId?: number[];

  @Field({ name: "searchQuery", nullable: true })
  searchQuery?: string;

  @Field({ name: "startDate", nullable: true })
  startDate?: string;

  @Field({ name: "endDate", nullable: true })
  endDate?: string;
}

@ArgsType()
export class GetTournamentsArgs extends IntersectionType(
  BaseGetTournamentArgs,
  PaginationArgs,
) {}
