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
import { PlayerResults } from "../round-results/dto/get-results.out";
import { RoundResultsFacade } from "../round-results/round-results.facade";
import { RoundsService } from "../rounds/rounds.service";
import { CreateStageArgs } from "./dto/create-stage.args";
import { Stage } from "./stage.entity";
import { StagesService } from "./stages.service";

@Resolver(() => Stage)
export class StagesResolver {
  constructor(
    private stagesService: StagesService,
    private lobbiesService: LobbiesService,
    private roundsService: RoundsService,
    private roundResultsFacade: RoundResultsFacade,
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
    return this.roundsService.findByStage(id);
  }

  @ResolveField()
  async roundCount(@Parent() { id }: Stage) {
    return this.roundsService.countByStage(id);
  }

  @ResolveField()
  async playersResults(@Parent() stage: Stage): Promise<PlayerResults[]> {
    return this.roundResultsFacade.findResultsByStage(stage.id);
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
