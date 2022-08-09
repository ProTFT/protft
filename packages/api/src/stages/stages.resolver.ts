import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
  Int,
} from "@nestjs/graphql";
import { fromRawToConsolidatedRoundResults } from "../lobbies/lobbies.adapter";
import { LobbiesService } from "../lobbies/lobbies.service";
import { CreateStageArgs } from "./dto/create-stage.args";
import { PlayerStageResult, Stage } from "./stage.entity";
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

  @ResolveField()
  async roundCount(@Parent() { id }: Stage) {
    return this.stagesService.findRoundCount(id);
  }

  @ResolveField()
  async playersResults(@Parent() stage: Stage): Promise<PlayerStageResult[]> {
    const rawResults = await this.stagesService.getConsolidatedResults(
      stage.id,
    );
    return fromRawToConsolidatedRoundResults(rawResults);
  }

  @Mutation(() => Stage)
  async createStage(
    @Args()
    { tournamentId, pointSchemaId, name, sequence, isFinal }: CreateStageArgs,
  ) {
    const payload = { tournamentId, pointSchemaId, name, sequence, isFinal };
    return this.stagesService.createOne(payload);
  }
}
