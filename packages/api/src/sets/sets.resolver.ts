import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Set } from "./set.entity";
import { SetsService } from "./sets.service";

@Resolver(() => Set)
export class SetsResolver {
  constructor(private setsService: SetsService) {}

  @Query(() => [Set])
  async sets() {
    return this.setsService.findAll();
  }

  @Query(() => Set, { nullable: true })
  async set(@Args("id", { type: () => Int }) id: number) {
    return this.setsService.findOne(id);
  }
}
