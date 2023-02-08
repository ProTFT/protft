import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class SortOption {
  @Field({ name: "column" })
  column: string;

  @Field({ name: "asc" })
  asc: boolean;
}

// TODO: review this in the future, cant use intersection with arrays
@ArgsType()
export class GetStatsArgs {
  @Field(() => Int, { name: "setId", nullable: true })
  setId?: number;

  @Field(() => [Int], { name: "tournamentIds", nullable: true })
  tournamentIds?: number[];

  @Field({ name: "region", nullable: true })
  region?: string;

  @Field(() => SortOption, { name: "sort", nullable: true })
  sort?: SortOption;

  @Field({ name: "searchQuery", nullable: true })
  searchQuery?: string;

  @Field(() => Int, { name: "take", nullable: true })
  take?: number;

  @Field(() => Int, { name: "skip", nullable: true })
  skip?: number;
}
