import {
  ArgsType,
  Field,
  InputType,
  Int,
  IntersectionType,
} from "@nestjs/graphql";
import { PaginationArgs } from "../../lib/dto/pagination.args";

@InputType()
export class SortOption {
  @Field({ name: "column" })
  column: string;

  @Field({ name: "asc" })
  asc: boolean;
}

@ArgsType()
export class BaseGetStatsArgs {
  @Field(() => Int, { name: "setId", nullable: true })
  setId?: number;

  @Field(() => Int, { name: "tournamentId", nullable: true })
  tournamentId?: number;

  @Field({ name: "region", nullable: true })
  region?: string;

  @Field(() => SortOption, { name: "sort", nullable: true })
  sort?: SortOption;

  @Field({ name: "searchQuery", nullable: true })
  searchQuery?: string;
}

@ArgsType()
export class GetStatsArgs extends IntersectionType(
  BaseGetStatsArgs,
  PaginationArgs,
) {}
