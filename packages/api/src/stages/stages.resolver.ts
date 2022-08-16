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

  @Mutation(() => Stage)
  async createStage(
    @Args()
    { tournamentId, pointSchemaId, name, sequence, isFinal }: CreateStageArgs,
  ) {
    const payload = { tournamentId, pointSchemaId, name, sequence, isFinal };
    return this.stagesService.createOne(payload);
  }
}
