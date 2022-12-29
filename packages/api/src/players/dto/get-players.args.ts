import { ArgsType, Field, IntersectionType } from "@nestjs/graphql";
import { PaginationArgs } from "../../lib/dto/pagination.args";

@ArgsType()
export class BaseGetPlayerArgs {
  @Field({ name: "region", nullable: true })
  region?: string;

  @Field({ name: "country", nullable: true })
  country?: string;

  @Field({ name: "searchQuery", nullable: true })
  searchQuery?: string;
}

@ArgsType()
export class GetPlayerArgs extends IntersectionType(
  BaseGetPlayerArgs,
  PaginationArgs,
) {}
