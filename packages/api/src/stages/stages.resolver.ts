import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
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

  @ResolveField()
  async lobbies(@Parent() stage: Stage) {
    const { id } = stage;
    return this.lobbiesService.findAllByStage(id);
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
