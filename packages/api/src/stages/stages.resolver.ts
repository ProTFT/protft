import { UseGuards } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
  Int,
} from "@nestjs/graphql";
import { GqlJwtAuthGuard } from "../auth/jwt-auth.guard";
import { DeleteResponse } from "../lib/dto/delete-return";
import { LobbiesService } from "../lobbies/lobbies.service";
import { PointSchemasService } from "../points/points.service";
import { RoundsService } from "../rounds/rounds.service";
import { StagePlayerInfo } from "../stage-player-infos/stage-player-info.entity";
import { StagePlayerInfosService } from "../stage-player-infos/stage-player-infos.service";
import { ApplyTiebreakersArgs } from "./dto/apply-tiebreakers.args";
import { CreateLobbiesResponse } from "./dto/create-lobbies.result";
import {
  CreateStagePlayerArgs,
  CreateStagePlayerByNameArgs,
} from "./dto/create-stage-player.args";
import { CreateStageArgs } from "./dto/create-stage.args";
import { GenerateLobbiesArgs } from "./dto/generate-lobbies.args";
import { GetStagePlayerArgs } from "./dto/get-stage-player.args";
import { UpdateStagePlayerArgs } from "./dto/update-stage-player.args";
import { UpdateStageArgs } from "./dto/update-stage.args";
import { UpdateTiebreakersArgs } from "./dto/update-tiebreakers.args";
import { Stage } from "./stage.entity";
import { StagesService } from "./stages.service";
import { Tiebreaker } from "./tiebreaker.entity";

@Resolver(() => Stage)
export class StagesResolver {
  constructor(
    private stagesService: StagesService,
    private lobbiesService: LobbiesService,
    private roundsService: RoundsService,
    private pointsSchemaService: PointSchemasService,
    private stagePlayerInfosService: StagePlayerInfosService,
  ) {}

  @Query(() => [Stage])
  async stages(@Args("tournamentId", { type: () => Int }) id: number) {
    return this.stagesService.findAllByTournament(id);
  }

  @Query(() => Stage)
  async stage(@Args("id", { type: () => Int }) id: number) {
    return this.stagesService.findOne(id);
  }

  @Query(() => [StagePlayerInfo])
  async playersFromPreviousStage(@Args("id", { type: () => Int }) id: number) {
    const stage = await this.stagesService.findOne(id);
    const previousStage = await this.stagesService.findPreviousStage(stage);
    return this.stagePlayerInfosService.findAllByStage(previousStage.id);
  }

  @ResolveField()
  async lobbies(@Parent() stage: Stage) {
    const { id } = stage;
    return this.lobbiesService.findAllByStage(id);
  }

  @ResolveField()
  async lobbyGroups(@Parent() stage: Stage) {
    const { id } = stage;
    return this.lobbiesService.findAllLobbyGroupsByStage(id);
  }

  @ResolveField()
  async rounds(@Parent() stage: Stage) {
    const { id } = stage;
    return this.roundsService.findByStage(id);
  }

  @ResolveField()
  async roundCount(@Parent() stage: Stage) {
    const { id } = stage;
    return this.roundsService.countByStage(id);
  }

  @ResolveField()
  async pointSchema(@Parent() stage: Stage) {
    const { pointSchemaId } = stage;
    return this.pointsSchemaService.findOne(pointSchemaId);
  }

  @ResolveField()
  async players(@Parent() stage: Stage) {
    const { id } = stage;
    return this.stagePlayerInfosService.findAllByStage(id);
  }

  @Query(() => [Tiebreaker])
  async tiebreakers() {
    return this.stagesService.findTiebreakers();
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Stage)
  async createStage(@Args() payload: CreateStageArgs) {
    return this.stagesService.createOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Stage)
  async updateStage(@Args() payload: UpdateStageArgs) {
    return this.stagesService.updateOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Stage)
  async updateTiebreakers(@Args() payload: UpdateTiebreakersArgs) {
    return this.stagesService.updateTiebreakers(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => DeleteResponse)
  async deleteStage(@Args({ name: "id", type: () => Int }) id: number) {
    return this.stagesService.deleteOne(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Stage)
  async createStagePlayers(
    @Args() { stageId, playerIds }: CreateStagePlayerArgs,
  ) {
    const payload = { stageId, playerIds };
    return this.stagesService.createStagePlayers(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => CreateLobbiesResponse)
  async generateLobbies(
    @Args()
    { stageId, roundsPerLobbyGroup }: GenerateLobbiesArgs,
  ) {
    const stagePlayers = await this.stagePlayerInfosService.findAllByStage(
      stageId,
    );
    return this.stagesService.generateLobbies(
      stageId,
      roundsPerLobbyGroup,
      stagePlayers.length,
    );
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Stage)
  async createStagePlayersByName(
    @Args() { stageId, playerNames }: CreateStagePlayerByNameArgs,
  ) {
    const payload = { stageId, playerNames };
    return this.stagesService.createStagePlayerByName(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => StagePlayerInfo)
  async stagePlayer(@Args() args: GetStagePlayerArgs) {
    return this.stagePlayerInfosService.findOne(args);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => StagePlayerInfo)
  async updateStagePlayer(@Args() args: UpdateStagePlayerArgs) {
    return this.stagePlayerInfosService.updateOne(args);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [Stage])
  async applyTiebreakersToAllStages(@Args() args: ApplyTiebreakersArgs) {
    return this.stagesService.applyTiebreakersToAll(args);
  }
}
