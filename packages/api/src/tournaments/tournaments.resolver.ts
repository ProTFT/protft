import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { SetsService } from "../sets/sets.service";
import { StagesService } from "../stages/stages.service";
import { Tournament } from "./tournament.entity";
import { TournamentsService } from "./tournaments.service";

@Resolver(() => Tournament)
export class TournamentsResolver {
  constructor(
    private tournamentsService: TournamentsService,
    private setService: SetsService,
    private stagesService: StagesService,
  ) {}

  @Query(() => [Tournament])
  async tournaments() {
    return this.tournamentsService.findAll();
  }

  @Query(() => Tournament)
  async tournament(@Args("id", { type: () => Int }) id: number) {
    return this.tournamentsService.findOne(id);
  }

  @ResolveField()
  async set(@Parent() tournament: Tournament) {
    const { setId } = tournament;
    return this.setService.findOne(setId);
  }

  @ResolveField()
  async stages(@Parent() tournament: Tournament) {
    const { id } = tournament;
    return this.stagesService.findAllByTournament(id);
  }
}
