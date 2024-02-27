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
  @Field(() => [Int], { name: "setIds", nullable: true })
  setIds?: number[];

  @Field(() => [Int], { name: "tournamentIds", nullable: true })
  tournamentIds?: number[];

  @Field(() => [String], { name: "regions", nullable: true })
  regions?: string[];

  @Field(() => SortOption, { name: "sort", nullable: true })
  sort?: SortOption;

  @Field({ name: "searchQuery", nullable: true })
  searchQuery?: string;

  @Field(() => Int, { name: "take", nullable: true })
  take?: number;

  @Field(() => Int, { name: "skip", nullable: true })
  skip?: number;

  @Field(() => Int, { name: "minimumGames", nullable: true })
  minimumGames?: number;
}
