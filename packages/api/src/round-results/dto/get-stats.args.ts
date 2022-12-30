import { ArgsType, Field, Int, IntersectionType } from "@nestjs/graphql";
import { PaginationArgs } from "../../lib/dto/pagination.args";

@ArgsType()
export class BaseGetStatsArgs {
  @Field(() => Int, { name: "setId", nullable: true })
  setId?: number;

  @Field({ name: "region", nullable: true })
  region?: string;
}

@ArgsType()
export class GetStatsArgs extends IntersectionType(
  BaseGetStatsArgs,
  PaginationArgs,
) {}
