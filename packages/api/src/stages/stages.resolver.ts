import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { LobbiesService } from "../lobbies/lobbies.service";
import { Stage } from "./stage.entity";

@Resolver(() => Stage)
export class StagesResolver {
  constructor(private lobbiesService: LobbiesService) {}

  @ResolveField()
  async lobbies(@Parent() stage: Stage) {
    const { id } = stage;
    return this.lobbiesService.findAllByStage(id);
  }
}
