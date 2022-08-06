import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
  Int,
} from "@nestjs/graphql";
import { LobbiesService } from "../lobbies/lobbies.service";
import { Stage } from "./stage.entity";
import { StagesService } from "./stages.service";

@Resolver(() => Stage)
export class StagesResolver {
  constructor(
    private stagesService: StagesService,
    private lobbiesService: LobbiesService,
  ) {}

  @Query(() => [Stage])
  async stages(@Args("tournamentId", { type: () => Int }) id: number) {
    return this.stagesService.findAllByTournament(id);
  }

  @ResolveField()
  async lobbies(@Parent() stage: Stage) {
    const { id } = stage;
    return this.lobbiesService.findAllByStage(id);
  }

  @ResolveField()
  async rounds(@Parent() stage: Stage) {
    const { id } = stage;
    return this.lobbiesService.findRoundByStage(id);
  }

  @Mutation(() => Stage)
  async createStage(
    @Args({ name: "tournamentId" }) tournamentId: number,
    @Args({ name: "pointSchemaId" }) pointSchemaId: number,
    @Args({ name: "name" }) name: string,
    @Args({ name: "sequence" }) sequence: number,
    @Args({ name: "isFinal" }) isFinal: boolean,
  ) {
    const payload = { tournamentId, pointSchemaId, name, sequence, isFinal };
    return this.stagesService.createOne(payload);
  }
}
