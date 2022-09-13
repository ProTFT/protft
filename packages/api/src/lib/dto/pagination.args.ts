import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { name: "take", nullable: true })
  take?: number;

  @Field(() => Int, { name: "skip", nullable: true })
  skip?: number;
}
